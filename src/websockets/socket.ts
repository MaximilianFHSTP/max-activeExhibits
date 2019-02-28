import  { Store } from '../database';
import { TouchController } from "../controller";
import * as os from 'os';
require('dotenv').config();

export class WebSocket
{
    private expressServer: any;
    private godSocket: any;
    private touchController: TouchController;
    private store: Store;

    constructor(server: any, godSocket: any)
    {
        console.log("---------------- Connecting to GoD ----------------");
        this.expressServer = server;
        this.godSocket = godSocket;
        this.touchController = new TouchController();
        this.store = Store.getInstance();

        this.attachGodListeners();
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
            const port = process.env.SERVER_PORT || 8100;
            this.expressServer.listen(port, () =>
            {
                console.log('Server (REST API) runs on Port ' + port);
            });
        });

        /**
         * will be called if a new GoD user joined the exhibit
         * data {location, user}
         */
        this.godSocket.on('odJoined', (result) =>
        {
            this.touchController.updateTouchUser(result.user);
        });

        /**
         * will be called if a GoD user actively left the exhibit
         * * data {location}
         */
        this.godSocket.on('odLeft', () =>
        {
            this.touchController.deleteTouchUser();
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