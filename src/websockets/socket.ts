import * as IO from 'socket.io';
import * as IOClient from 'socket.io-client';
import  { Connection, Store } from '../database';
import { OdController } from "../controller";
import * as os from 'os';

export class WebSocket
{
    private odSocket: any;
    private godSocket: any;
    private database: any;
    private odController: OdController;
    private store: Store;

    constructor(server: any)
    {
        this.odSocket = new IO(server);
        this.godSocket = IOClient.connect('http://god.meeteux.fhstp.ac.at:3000');
        this.odController = new OdController();
        this.database = Connection.getInstance();
        this.store = Store.getInstance();

        this.attachODListeners();
        this.attachGodListeners();
        this.startUserStatusIntervall();
    }

    private attachODListeners(): void
    {
        this.odSocket.on('connection', (socket) =>
        {
            socket.emit('connected', 'Client Table connected to Server!');

            socket.on('connectOD', (data) =>
            {
                this.odController.connectOD(data).then( (values) =>
                {
                    socket.emit('connectODResult', values);
                });

                this.odController.requestData().then( (values) =>
                {
                    socket.broadcast.emit('requestDataResult', values);
                });
            });

            socket.on('requestData', () =>
            {
                this.odController.requestData().then( (values) =>
                {
                    socket.emit('requestDataResult', values);
                });
            });

            socket.on('closeConnection', (user) =>
            {
                this.odController.removeUser(user).then( (result) =>
                {
                    socket.emit('closeConnectionResult', result);

                    this.odController.requestData().then( (values) =>
                    {
                        socket.broadcast.emit('requestDataResult', values);
                    });
                });
            });
        });
    }

    private attachGodListeners(): void
    {
        this.godSocket.on('news', (message) => {
            console.log(message);
            this.loginExhibit();
        });

        this.godSocket.on('loginExhibitResult', (result) => {
            this.store.location = result;
        });
    }

    public loginExhibit()
    {
        const ifaces = os.networkInterfaces();

        let address;

        Object.keys(ifaces).forEach(function (ifname) {
            ifaces[ifname].forEach(function (iface) {
              if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
              }
            
              address = iface.address;

            });
          });

        console.log('IP-Adresse: ' + address);
        this.godSocket.emit('loginExhibit', address);
    }

    private startUserStatusIntervall(): void
    {
        setInterval(() => {
            this.odController.findNotRespondingUser().then( (users) =>
            {
                this.godSocket.emit('disconnectNotRespondingUsers', users);
                for( let user of users)
                {
                    this.odController.removeUser(user);
                }
                this.odController.requestData().then( (values) =>
                {
                    this.odSocket.broadcast.emit('requestDataResult', values);
                });
            });
            this.odSocket.socket.broadcast.emit('exhibitStatusCheck');
        }, 1000 * 60 * 2);

        this.odSocket.on('checkUserStatusResult', (user) => {
            this.odController.updateUserStatus(user);
        });
    }
}