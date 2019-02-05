import * as Sequelize from 'sequelize';
import {DataFactory} from "./dataFactory";
require('dotenv').config();

export class Connection
{
    private static _instance: Connection;
    private readonly _sequelize: any;
    private _user: any;
    private _exhibit: any;
    private _question: any;
    private _answer: any;

    private constructor()
    {
        this._sequelize = new Sequelize('null', 'null', 'null', {
            dialect: 'sqlite',
            storage: 'database.sqlite',
            logging: false
        });
        this.initDatabaseTables();
        this.initDatabaseRelations();

        const dataFactory = new DataFactory();
        dataFactory.connection = this;

        this._sequelize.sync({force: true}).then(() => {
            dataFactory.createData().catch(err => {
                console.log("Could not create data!");
            });
        });
    }

    public static getInstance(): Connection
    {
        if(Connection._instance === null || Connection._instance === undefined)
        {
            Connection._instance = new Connection();
        }

        return Connection._instance;
    }

    private initDatabaseRelations(): void
    {
        //User to Group Relation (1:n)
        this._exhibit.hasMany(this._user, {onDelete: 'cascade'});
        this._user.belongsTo(this._exhibit);

        //_location to _position relation (1:n)
        this._question.hasMany(this._answer, {foreignKey: {allowNull: true}, onDelete: 'cascade'});
        this._answer.belongsTo(this._question);
    }

    private initDatabaseTables():void
    {
        this._question = this._sequelize.define('question',
            {
                text: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                order: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                elaboration: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            });

        this._answer = this._sequelize.define('answer',
            {
                text: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                isCorrectAnswer: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                numberOfAnsweredTimes: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }
            });

        this._user = this._sequelize.define('user', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            location: {
                type: Sequelize.STRING,
                allowNull: true
            },
            statusTime: {
                type: Sequelize.DATE,
                alllowNull: true
            },
            message: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: ""
            },
            socketId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            beacon: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: false
            },
            correctAnswerCounter: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            answerCounter: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        });

        this._exhibit = this._sequelize.define('exhibit', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            contentURL: {
               type: Sequelize.STRING
            },
            contentVersion: {
               type: Sequelize.DOUBLE,
                defaultValue: 1.0
            },
            ipAddress: {
               type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            currentSeat: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            maxSeat: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 1
            }
        });
    }

    get exhibit(): any {
        return this._exhibit;
    }

    get user(): any {
        return this._user;
    }

    get answer(): any {
        return this._answer;
    }

    get question(): any {
        return this._question;
    }

    get sequelize(): any {
        return this._sequelize;
    }
}
