import * as Express from 'express';
import * as http from 'http';
import * as IOClient from 'socket.io-client';
import  { WebSocket } from '../websockets';
import * as bodyParser from 'body-parser';
import {UnityRestController} from "../rest";
require('dotenv').config();

export default class Server
{
    private _server: any;
    private _socket: WebSocket;
    private _app: any;
    private _godSocket: any;
    private _unityRestController: UnityRestController;

    constructor()
    {
        this._app = new Express();
        this._server = new http.Server(this._app);

        this._godSocket = IOClient.connect(process.env.GOD_URL, { secure: true, reconnect: true, rejectUnauthorized : false });
        this._socket = new WebSocket(this._server, this._godSocket);

        this._app.use(bodyParser.urlencoded({ extended: true }));
        this._app.use(bodyParser.json());

        // Create REST Controllers
        this._unityRestController = new UnityRestController(this._app, this._godSocket);
    }
}

