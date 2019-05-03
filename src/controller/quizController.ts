import {Connection} from '../database';
import {Op} from 'sequelize';

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

    public async updateAnsweredQuestion(data): Promise<any> {
        let questionId = data.questionId;
        let questionData;
        return this._database.question.findOne({
            where: {order: questionId},
            include: [{
                model: this._database.answer
            }]
        }).then(async question =>
        {
            questionData = await question;
            let answerIdA = questionData.answers[0].id
            return this._database.answer.findOne({
                where: {id: answerIdA}
            }).then(async answerA =>
            {
                return await answerA.update({numberOfAnsweredTimes: answerA.numberOfAnsweredTimes + data.answerCountA}).then(() =>
                {
                    let answerIdB = questionData.answers[1].id
                    return this._database.answer.findOne({
                        where: {id: answerIdB}
                    }).then(async answerB =>
                    {
                        return await answerB.update({numberOfAnsweredTimes: answerB.numberOfAnsweredTimes + data.answerCountB}).then(() =>
                        {
                            let answerIdC = questionData.answers[2].id
                            return this._database.answer.findOne({
                                where: {id: answerIdC}
                            }).then(async answerC =>
                            {
                                return await answerC.update({numberOfAnsweredTimes: answerC.numberOfAnsweredTimes + data.answerCountC}).then(() =>
                                {
                                    let answerIdD = questionData.answers[3].id
                                    return this._database.answer.findOne({
                                        where: {id: answerIdD}
                                    }).then(async answerD =>
                                    {
                                        return await answerD.update({numberOfAnsweredTimes: answerD.numberOfAnsweredTimes + data.answerCountD}).then(() =>
                                        {
                                            return this._database.question.findOne({
                                                where: {order: questionId},
                                                include: [{
                                                    model: this._database.answer
                                                }]
                                            }).then(async (question) =>
                                            {
                                                let updatedQuestion = await question;
                                                return updatedQuestion;
                                            }).catch(err => {
                                                console.log(err);
                                            });
                                        }).catch(err => {
                                            console.log(err);
                                        });;
                                    }).catch(err => {
                                        console.log(err);
                                    });;
                                }).catch(err => {
                                    console.log(err);
                                });;
                            }).catch(err => {
                                console.log(err);
                            });;
                        }).catch(err => {
                            console.log(err);
                        });;
                    }).catch(err => {
                        console.log(err);
                    });;
                }).catch(err => {
                    console.log(err);
                });;
            }).catch(err => {
                console.log(err);
            });;
        }).catch(err => {
            console.log(err);
        });;
    }

    public setUserNotAnswered(data){
        return this._database.user.findAll({where: {isActive: true}}).then((users) => {
            for(let u of users)
            {
                const dateToCompare = (Date.now()-30000);
                this._database.useranswer.findOne({
                    where: {userId: u.id,
                    createdAt: {[Op.gt]: dateToCompare}},
                }).then(uanswer =>
                {
                    console.log(uanswer.id);
                    console.log( u.name + " answered");
                }).catch((err) => {
                    console.log("No Answer " + u.name);
                    this._database.useranswer.create({
                        answertime: 30000,
                        timestamp: Date.now(),
                        userId: u.id,
                        questionId: data.questionId,
                        correctAnswer: null
                    });
                });
                
            }
        }).catch((err) => {
            return "Failed";
        });
    }
}