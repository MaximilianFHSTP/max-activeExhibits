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

            /**
             * call to connect the projection to the server
             */
            socket.on('connectProjection', () => {
                this.projectionSocket = socket;
                socket.emit('connectProjectionResult', 'SUCCESS');
            });

            /**
             * call to connect the touch screens (left and right) to the server
             * data {device: ['left' / 'right']}
             */
            socket.on('connectTouch', (data) =>
            {
                if(data.device === 'left')
                    this.touchLeftSocket = socket;

                else
                    this.touchRightSocket = socket;

                socket.emit('connectTouchResult', 'SUCCESS');
            });

            /**
             * call to send data to the projection
             * data {device: ['left' / 'right']}
             */
            socket.on('sendDataToProjection', (data) =>
            {
                (this.touchLeftSocket.id === socket.id) ? data.device = 'left' : data.device = 'right';

                if(this.projectionSocket)
                    this.projectionSocket.emit('updateProjection',data);
            });

            /**
             * Call if a local user (no OD) started to explore the exhibit
             * data {device: ['left' / 'right']}
             */
            socket.on('localUserJoined', (data) =>
            {
                const location = (data.device === 'left') ? this.touchController.getLeftLocationId() : this.touchController.getRightLocationId();
                this.godSocket.emit('updateSeat', {location});
            });

            /**
             * Call if a local user (no OD) has reached the time out
             * data {device: ['left' / 'right']}
             */
            socket.on('localUserLeft', (data) =>
            {
                const location = (data.device === 'left') ? this.touchController.getLeftLocationId() : this.touchController.getRightLocationId();
                const parentLocation = this.touchController.getLocationId();
                this.godSocket.emit('disconnectedFromExhibit', {location, parentLocation});
            });

            /**
             * Call if a user who came from GoD has reached the time out
             * data {device: ['left' / 'right']}
             */
            socket.on('userTimedOut', (data) =>
            {
                const location = (data.device === 'left') ? this.touchController.getLeftLocationId() : this.touchController.getRightLocationId();
                const parentLocation = this.touchController.getLocationId();
                this.godSocket.emit('disconnectedFromExhibit', {location, parentLocation});
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
        });

        /**
         * will be called if a new GoD user joined the exhibit
         * data {location, user}
         */
        this.godSocket.on('odJoined', (result) =>
        {
            const isLeft = this.touchController.isLeftLocation(result.location.id);
            this.touchController.updateTouchUser(result.location, result.user);

            if(isLeft && this.touchLeftSocket)
                this.touchLeftSocket.emit('userJoined', result.user);

            if(!isLeft && this.touchRightSocket)
                this.touchRightSocket.emit('userJoined', result.user);
        });

        /**
         * will be called if a GoD user actively left the exhibit
         * * data {location}
         */
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

        let address = undefined;

        Object.keys(ifaces).forEach(function (ifname)
        {
            ifaces[ifname].forEach(function (iface)
            {
              // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
              if ('IPv4' !== iface.family || iface.internal !== false || process.env.IP_ADDRESS !== iface.address)
                return;
            
              address = iface.address;
            });
          });

        if(address)
        {
            console.log('IP-Adresse: ' + address);
            this.godSocket.emit('loginExhibit', address);
        }
    }
}