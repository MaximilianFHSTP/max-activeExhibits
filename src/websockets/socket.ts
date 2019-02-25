import * as IO from 'socket.io';
import * as IOClient from 'socket.io-client';
import  { Store } from '../database';
import { TouchController } from "../controller";
import * as os from 'os';
require('dotenv').config();

export class WebSocket
{
    private expressServer: any;
    private socketServer: any;
    private godSocket: any;
    private touchController: TouchController;
    private store: Store;

    private legendGameSocket: any;

    constructor(server: any)
    {
        this.expressServer = server;
        this.godSocket = IOClient.connect(process.env.GOD_URL, { secure: true, reconnect: true, rejectUnauthorized : false });
        this.touchController = new TouchController();
        this.store = Store.getInstance();

        this.attachGodListeners();
    }

    private attachClientListeners(): void
    {
        this.socketServer.on('connection', (socket) =>
        {
            socket.emit('connected', 'Projection connected to Server!');

            /**
             * call to connect the projection to the server
             */
            socket.on('connectTable', () => {
                this.legendGameSocket = socket;
                socket.emit('connectTableResult', 'SUCCESS');
            });

            /**
             * Call if a local user (no OD) started to explore the exhibit
             * data {device: ['left' / 'right']}
             */
            socket.on('localUserJoined', () =>
            {
                const location = this.touchController.getTouchLocationId();
                this.godSocket.emit('updateSeat', {location});
            });

            /**
             * Call if a local user (no OD) has reached the time out
             * data {device: ['left' / 'right']}
             */
            socket.on('localUserLeft', () =>
            {
                const location = this.touchController.getTouchLocationId();
                const parentLocation = this.touchController.getLocationId();
                this.godSocket.emit('disconnectedFromExhibit', {location, parentLocation});
            });

            /**
             * Call if a user who came from GoD has reached the time out
             * data {device: ['left' / 'right']}
             */
            socket.on('userTimedOut', () =>
            {
                const location = this.touchController.getTouchLocationId();
                const user = this.touchController.getUserId();
                const parentLocation = this.touchController.getLocationId();
                this.godSocket.emit('disconnectedFromExhibit', {location, parentLocation, user});
            });

            socket.on('unlockCoaMantle', () =>
            {
                const userId = this.touchController.getUserId();
                const coaId = process.env.UNLOCK_COA_MANTLE_ID;

                this.godSocket.emit('unlockCoaPartFromExhibit', {userId, coaId});
            });
        });
    }

    private attachGodListeners(): void
    {
        /**
         * will automatically login the exhibit at GoD
         */
        this.godSocket.on('news', () => {
            this.loginExhibit();
        });

        /**
         * gets the location information as result
         * data {location, leftLocation, rightLocation}
         */
        this.godSocket.on('loginExhibitResult', (result) =>
        {
            this.touchController.updateTouchLocations(result.data);

            if(!result.data) return;

            console.log("---------------- Connected to GoD ----------------");
            this.socketServer = new IO(this.expressServer);
            this.attachClientListeners();
        });

        /**
         * will be called if a new GoD user joined the exhibit
         * data {location, user}
         */
        this.godSocket.on('odJoined', (result) =>
        {
            this.touchController.updateTouchUser(result.user);

            this.legendGameSocket.emit('userJoined', result.user);
        });

        /**
         * will be called if a GoD user actively left the exhibit
         * * data {location}
         */
        this.godSocket.on('odLeft', () =>
        {
            this.touchController.deleteTouchUser();

            this.legendGameSocket.emit('userLeft');
        });
    }

    public loginExhibit()
    {
        const ifaces = os.networkInterfaces();

        let address = undefined;

        Object.keys(ifaces).forEach(function (ifname)
        {
            ifaces[ifname].forEach(function (iface)
            {
              // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
              if ('IPv4' === iface.family && iface.internal === false && process.env.IP_ADDRESS === iface.address)
                  address = iface.address;
            });
          });

        if(process.env.BYPASS_IP_ADDRESS)
        {
            console.log('Bypass-IP-Adresse: ' + process.env.BYPASS_IP_ADDRESS);
            this.godSocket.emit('loginExhibit', process.env.BYPASS_IP_ADDRESS);
            return;
        }

        if(address)
        {
            console.log('IP-Adresse: ' + address);
            this.godSocket.emit('loginExhibit', address);
        }
    }
}