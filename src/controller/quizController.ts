import {Connection} from '../database';

export class QuizController {
    private _database: Connection;
    private _currentQuestion = {order: 0};
    private _maxQuestionCount = 10;

    constructor() {
        this._database = Connection.getInstance();
    }

    public findNextQuestion()
    {
        let nextOrder = this._currentQuestion.order + 1;

        if(nextOrder > this._maxQuestionCount)
            nextOrder = 1;

        return this._database.question.findOne({
            where: {order: nextOrder},
            include: [{
                model: this._database.answer
            }]
        }).then(question =>
        {
            this._currentQuestion = question;
            return question;
        });
    }
}