import * as Express from 'express';
import * as http from 'http';
import  { WebSocket } from '../websockets';
require('dotenv').config();

export default class Server
{
    private server: any;
    private socket: WebSocket;
    private app: any;

    constructor()
    {
        this.app = new Express();
        this.server = new http.Server(this.app);
        this.socket = new WebSocket(this.server);

        console.log('Server runs on Port: ' + process.env.SERVER_PORT);
        this.server.listen(process.env.SERVER_PORT);

        this.app.get('/proj', function (req, res)
        {
            res.sendFile(process.env.NODE_PATH + '/projection.html');
        });

        this.app.get('/touchLeft', function (req, res)
        {
            res.sendFile(process.env.NODE_PATH + '/touchLeft.html');
        });
    }
}

