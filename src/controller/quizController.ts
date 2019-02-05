import {Connection} from '../database';

export class QuizController {
    private _database: Connection;
    private _currentQuestion = {order: 0};
    private _maxQuestionCount = 16;

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

    public updateAnsweredQuestion(data){
        let questionId = data.questionId;
        let questionData;
        return this._database.question.findOne({
            where: {order: questionId},
            include: [{
                model: this._database.answer
            }]
        }).then(question =>
        {
            questionData = question;
            let answerIdA = questionData.answers[0].id
            return this._database.answer.findOne({
                where: {id: answerIdA}
            }).then(answerA =>
            {
                answerA.update({numberOfAnsweredTimes: answerA.numberOfAnsweredTimes + data.answerCountA}).then(() =>
                {
                    let answerIdB = questionData.answers[1].id
                    return this._database.answer.findOne({
                        where: {id: answerIdB}
                    }).then(answerB =>
                    {
                        answerB.update({numberOfAnsweredTimes: answerB.numberOfAnsweredTimes + data.answerCountB}).then(() =>
                        {
                            let answerIdC = questionData.answers[2].id
                            return this._database.answer.findOne({
                                where: {id: answerIdC}
                            }).then(answerC =>
                            {
                                answerC.update({numberOfAnsweredTimes: answerC.numberOfAnsweredTimes + data.answerCountC}).then(() =>
                                {
                                    let answerIdD = questionData.answers[3].id
                                    return this._database.answer.findOne({
                                        where: {id: answerIdD}
                                    }).then(answerD =>
                                    {
                                        answerD.update({numberOfAnsweredTimes: answerD.numberOfAnsweredTimes + data.answerCountD}).then(() =>
                                        {
                                            return this._database.question.findOne({
                                                where: {order: questionId},
                                                include: [{
                                                    model: this._database.answer
                                                }]
                                            }).then(question =>
                                            {
                                                return question;
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
}