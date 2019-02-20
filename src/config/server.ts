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

        this.app.get('/', function (req, res)
        {
            res.sendFile(process.env.NODE_PATH + '/index.html');
        });

        this.app.get('/assets/img/*', function(req, res, path){
            var imgpth = req.url;
            var img = process.env.NODE_PATH + imgpth; 
            res.sendFile(img);
        });

        this.app.get('/assets/fonts/*', function(req, res, path){
            var fontpth = req.url;
            var font = process.env.NODE_PATH + fontpth; 
            res.sendFile(font);
        });

        this.app.get('/assets/icons/*', function(req, res, path){
            var iconpth = req.url;
            var icon = process.env.NODE_PATH + iconpth; 
            res.sendFile(icon);
        });

        this.app.get('/css/*', function (req, res)
        {   var csspth = req.url;
            var css = process.env.NODE_PATH + csspth; 
            res.sendFile(css);
        });

        this.app.get('/js/*', function (req, res)
        {   var jspth = req.url;
            var js = process.env.NODE_PATH + jspth; 
            res.sendFile(js);
        });

        
    }
}

