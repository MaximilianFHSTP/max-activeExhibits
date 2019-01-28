import * as IO from 'socket.io';
import * as IOClient from 'socket.io-client';
import  { Connection, Store } from '../database';
import { OdController } from "../controller";
import * as os from 'os';
import {QuizController} from "../controller/quizController";
require('dotenv').config();

export class WebSocket
{
    private odSocket: any;
    private godSocket: any;
    private database: any;
    private odController: OdController;
    private quizController: QuizController;
    private store: Store;
    private EXPIRATION_TIME = 1000 * 60;

    private tableClientSocket: any;

    constructor(server: any)
    {
        this.odSocket = new IO(server);
        this.godSocket = IOClient.connect(process.env.GOD_URL, { secure: true, reconnect: true, rejectUnauthorized : false });
        this.odController = new OdController();
        this.quizController = new QuizController();
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

            socket.on('connectClient', () => {
                this.tableClientSocket = socket.id;
                // console.log(this.tableClientSocket);
                socket.emit('connectClientResult', 'SUCCESS');
            });

            socket.on('getNextQuestion', () =>
            {
                this.quizController.findNextQuestion().then( question =>
                {
                    socket.emit('getNextQuestionResult', question);
                });
            });

            socket.on('connectOD', (data) =>
            {
                this.odController.connectOD(data, socket.id).then( (values) =>
                {
                    socket.emit('connectODResult', values);
                });

                this.odController.requestData().then( (values) =>
                {
                    socket.to(this.tableClientSocket).emit('requestDataResult', values);
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
                console.log(user);
                this.odController.removeUser(user.id).then( (result) =>
                {
                    socket.emit('closeConnectionResult', result);

                    this.odController.requestData().then( (values) =>
                    {
                        socket.to(this.tableClientSocket).emit('requestDataResult', values);
                    });
                });
            });

            socket.on('kickUser', (userId) =>
            {
                this.odController.findUser(userId).then((user) => {
                    this.odController.removeUser(userId).then( (result) =>
                    {
                        if(result === 'SUCCESS')
                        {
                            this.odSocket.sockets.connected[user.socketId].disconnect();

                            this.odController.requestData().then( (values) =>
                            {
                                this.odSocket.to(this.tableClientSocket).emit('requestDataResult', values);
                            });
                        }
                    });
                });
            });

            socket.on('sendMessage', (data) => {
                this.odController.updateMessage(data).then( (values) =>
                {
                    socket.to(this.tableClientSocket).emit('requestDataResult', values);
                });
            });

            socket.on('exhibitStatusCheckResult', (user) => {
                console.log('exhibitStatusCheckResult - User: ' + user.id);
                this.odController.updateUserStatus(user);
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
            this.store.location = result.data;
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

    private startUserStatusIntervall(): void
    {
        setInterval(() => {
            this.odController.findAllUsers().then( (users) =>
            {
                if(users !== null)
                {
                    let deleteUsers = [];
                    for (let user of users)
                    {
                        if(((Date.now()) - user.statusTime) > this.EXPIRATION_TIME)
                        {
                            // console.log((Date.now()) - user.statusTime + " ______ "+ this.EXPIRATION_TIME);
                            this.odController.removeUser(user.id);
                            deleteUsers.push(user);
                        }
                    }

                    if(deleteUsers.length > 0)
                    {
                        this.godSocket.emit('disconnectUsers', deleteUsers);
                    }
                }

                this.odController.requestData().then( (values) =>
                {
                    this.odSocket.to(this.tableClientSocket).emit('requestDataResult', values);
                });
            }).then(() => { this.odSocket.emit('exhibitStatusCheck') });
        }, 1000 * 30);
    }
}