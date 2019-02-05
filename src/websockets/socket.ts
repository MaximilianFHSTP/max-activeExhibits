import * as IO from 'socket.io';
import * as IOClient from 'socket.io-client';
import  { Connection, Store } from '../database';
import { OdController } from "../controller";
import * as os from 'os';
require('dotenv').config();

export class WebSocket
{
    private socketServer: any;
    private godSocket: any;
    private database: any;
    private odController: OdController;
    private store: Store;

    private legendGameSocket: any;
    private touchSocket: any;

    constructor(server: any)
    {
        this.socketServer = new IO(server);
        this.godSocket = IOClient.connect(process.env.GOD_URL, { secure: true, reconnect: true, rejectUnauthorized : false });
        this.odController = new OdController();
        this.database = Connection.getInstance();
        this.store = Store.getInstance();

        this.attachODListeners();
        this.attachGodListeners();
    }

    private attachODListeners(): void
    {
        this.socketServer.on('connection', (socket) =>
        {
            socket.emit('connected', 'Client Table connected to Server!');

            socket.on('connectLegendGame', () => {
                this.legendGameSocket = socket;
                socket.emit('connectLegendGameResult', 'SUCCESS');
            });

            socket.on('connectTouch', () =>
            {
                this.touchSocket = socket;
                socket.emit('connectTouchResult', 'SUCCESS');
            });

            socket.on('sendDataToProjection', (data) =>
            {
                this.legendGameSocket.emit('updateProjection',data);
            });
        });
    }

    private attachGodListeners(): void
    {
        this.godSocket.on('news', () => {
            this.loginExhibit();
        });

        this.godSocket.on('loginExhibitResult', (result) => {
            this.store.location = result.data;
        });

        this.godSocket.on('odJoined', (result) =>
        {
            this.touchSocket.emit('updateUserInformation', result);
            this.legendGameSocket.emit('updateUserInformation', result);
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