import {Connection} from "./connection";

export class DataFactory {
    private static _instance: DataFactory;
    private _connection: Connection;

    public static getInstance(): DataFactory {
        if (DataFactory._instance === null || DataFactory._instance === undefined) {
            DataFactory._instance = new DataFactory();
        }

        return DataFactory._instance;
    }

    public async createData()
    {
        await this.createQuestions();
        await this.createAnswers();
    }

    private async createQuestions() {
        return this._connection.sequelize.transaction(t1 => {
            return Promise.all([
                this._connection.question.create({
                    id: 1,
                    text: 'Welches der folgenden Frameworks erzeugt eine native App?',
                    order: 1
                }),
                this._connection.question.create({
                    id: 2,
                    text: 'In welchem Ordner findet man die Module die bei Node.JS installiert werden?',
                    order: 2
                })
            ]);
        });
    }

    private async createAnswers() {
        return this._connection.sequelize.transaction(t1 => {
            return Promise.all([
                this._connection.answer.create({
                    id: 1,
                    questionId: 1,
                    isCorrectAnswer: false,
                    text: 'Angular'
                }),
                this._connection.answer.create({
                    id: 2,
                    questionId: 1,
                    isCorrectAnswer: false,
                    text: 'Vue'
                }),
                this._connection.answer.create({
                    id: 3,
                    questionId: 1,
                    isCorrectAnswer: false,
                    text: 'React'
                }),
                this._connection.answer.create({
                    id: 4,
                    questionId: 1,
                    isCorrectAnswer: true,
                    text: 'Xamarin'
                }),
                this._connection.answer.create({
                    id: 5,
                    questionId: 2,
                    isCorrectAnswer: true,
                    text: 'node_modules'
                }),
                this._connection.answer.create({
                    id: 6,
                    questionId: 2,
                    isCorrectAnswer: false,
                    text: 'modules'
                }),
                this._connection.answer.create({
                    id: 7,
                    questionId: 2,
                    isCorrectAnswer: false,
                    text: 'node'
                }),
                this._connection.answer.create({
                    id: 8,
                    questionId: 2,
                    isCorrectAnswer: false,
                    text: 'config'
                })
            ]);
        });
    }

    set connection(value: any) {
        this._connection = value;
    }
}