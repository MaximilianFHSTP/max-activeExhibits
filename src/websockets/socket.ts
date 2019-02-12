import * as IO from 'socket.io';
import * as IOClient from 'socket.io-client';
import  { Store } from '../database';
import { TouchController } from "../controller";
import * as os from 'os';
require('dotenv').config();

export class WebSocket
{
    private socketServer: any;
    private godSocket: any;
    private touchController: TouchController;
    private store: Store;

    private projectionSocket: any;
    private touchLeftSocket: any;
    private touchRightSocket: any;

    constructor(server: any)
    {
        this.socketServer = new IO(server);
        this.godSocket = IOClient.connect(process.env.GOD_URL, { secure: true, reconnect: true, rejectUnauthorized : false });
        this.touchController = new TouchController();
        this.store = Store.getInstance();

        this.attachClientListeners();
        this.attachGodListeners();
    }

    private attachClientListeners(): void
    {
        this.socketServer.on('connection', (socket) =>
        {
            socket.emit('connected', 'Projection connected to Server!');

            socket.on('connectProjection', () => {
                this.projectionSocket = socket;
                socket.emit('connectProjectionResult', 'SUCCESS');
            });

            socket.on('connectTouch', (data) =>
            {
                if(data.device === 'left')
                    this.touchLeftSocket = socket;

                else
                    this.touchRightSocket = socket;

                socket.emit('connectTouchResult', 'SUCCESS');
            });

            socket.on('sendDataToProjection', (data) =>
            {
                (this.touchLeftSocket.id === socket.id) ? data.device = 'left' : data.device = 'right';

                if(this.projectionSocket)
                    this.projectionSocket.emit('updateProjection',data);
            });

            socket.on('localUserJoined', (data) =>
            {
                console.log('local user joined')
                console.log(data)
                // const location = (data.device === 'left') ? this.touchController.getLeftLocationId() : this.touchController.getRightLocationId();
                // this.godSocket.emit('updateSeat', {location, occupied: true});
            });

            socket.on('localUserLeft', (data) =>
            {
                console.log('local user left')
                console.log('data')
                // const location = (data.device === 'left') ? this.touchController.getLeftLocationId() : this.touchController.getRightLocationId();
                // this.godSocket.emit('updateSeatOccupied', {location, occupied: false});
            });
        });
    }

    private attachGodListeners(): void
    {
        this.godSocket.on('news', () => {
            this.loginExhibit();
        });

        this.godSocket.on('loginExhibitResult', (result) =>
        {
            this.touchController.updateTouchLocations(result.data);
        });

        this.godSocket.on('odJoined', (result) =>
        {
            const isLeft = this.touchController.isLeftLocation(result.location.id);
            this.touchController.updateTouchUser(result.location, result.user);

            if(isLeft && this.touchLeftSocket)
                this.touchLeftSocket.emit('userJoined', result.user);

            if(!isLeft && this.touchRightSocket)
                this.touchRightSocket.emit('userJoined', result.user);
        });

        this.godSocket.on('odLeft', (result) =>
        {
            const isLeft = this.touchController.isLeftLocation(result.location.id);
            this.touchController.deleteTouchUser(result.location);

            if(isLeft && this.touchLeftSocket)
                this.touchLeftSocket.emit('userLeft');

            if(!isLeft && this.touchRightSocket)
                this.touchRightSocket.emit('userLeft');
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
        // address = 'localhost';
        console.log('IP-Adresse: ' + address);
        this.godSocket.emit('loginExhibit', address);
    }
}