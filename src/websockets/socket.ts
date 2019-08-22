import * as IO from 'socket.io';
import * as LogTypes from '../config/logTypes';
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

    private projectionSocket: any;
    private touchLeftSocket: any;
    private touchRightSocket: any;

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
                console.log('connectTouch');
                console.log(data);
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
                if(this.touchLeftSocket && this.touchLeftSocket.id === socket.id)
                    data.device = 'left';

                else if(this.touchRightSocket && this.touchRightSocket.id === socket.id)
                    data.device = 'right';

                if(data.device === null || data.device === undefined) return;

                console.log("show on projection");
                console.log(data);
                if(this.projectionSocket){
                    this.projectionSocket.emit('updateProjection',data);
                }

            });

            /**
             * Call if a local user (no OD) started to explore the exhibit
             * data {device: ['left' / 'right']}
             */
            socket.on('localUserJoined', (data) =>
            {
                const location = (data.device === 'left') ? this.touchController.getLeftLocationId() : this.touchController.getRightLocationId();
                this.godSocket.emit('updateSeat', {location});
                this.godSocket.emit('addExhibitLogEntry', {locationId: location, comment: 'localUser', userId: null, type: LogTypes.EXHIBIT_LOCAL_USER_JOINED});
            });

            /**
             * Call if a local user (no OD) has reached the time out
             * data {device: ['left' / 'right']}
             */
            socket.on('localUserLeft', (data) =>
            {
                const location = (data.device === 'left') ? this.touchController.getLeftLocationId() : this.touchController.getRightLocationId();
                const parentLocation = this.touchController.getLocationId();
                this.godSocket.emit('exhibitDisconnectedFromExhibit', {location, parentLocation, user: 'localUser'});
                this.godSocket.emit('addExhibitLogEntry', {locationId: location, comment: 'localUser', userId: null, type: LogTypes.EXHIBIT_LOCAL_USER_LEFT});
            });

            /**
             * Call if a user who came from GoD has reached the time out
             * data {device: ['left' / 'right']}
             */
            socket.on('userTimedOut', (data) =>
            {
                console.log("user timed out at "+ Date.now());
                console.log(data);
                const location = (data.device === 'left') ? this.touchController.getLeftLocationId() : this.touchController.getRightLocationId();
                const user = (data.device === 'left') ? this.touchController.getLeftUserId() : this.touchController.getRightUserId();
                const parentLocation = this.touchController.getLocationId();
                this.godSocket.emit('exhibitDisconnectedFromExhibit', {location, parentLocation, user});
                this.godSocket.emit('addExhibitLogEntry', {locationId: location, comment: null, userId: user, type: LogTypes.EXHIBIT_GOD_USER_LEFT})
            });

            socket.on('unlockCoaMantle', (data) =>
            {
                // find special person
                console.log('special person found');
                console.log(data);
                const userId = (data.device === 'left') ? this.touchController.getLeftUserId() : this.touchController.getRightUserId();
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
            const isLeft = this.touchController.isLeftLocation(result.location.id);
            this.touchController.updateTouchUser(result.location, result.user);

            this.godSocket.emit('addExhibitLogEntry', {locationId: result.location.id, comment: null, userId: result.user.id, type: LogTypes.EXHIBIT_GOD_USER_JOINED});

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
            const user = (isLeft) ? this.touchController.getLeftUserId() : this.touchController.getRightUserId();
            this.touchController.deleteTouchUser(result.location);

            this.godSocket.emit('addExhibitLogEntry', {locationId: result.location.id, comment: null, userId: user, type: LogTypes.EXHIBIT_GOD_USER_LEFT});

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
