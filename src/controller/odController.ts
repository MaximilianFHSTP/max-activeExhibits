import {Connection} from '../database';

export class OdController {
    private database: Connection;

    constructor() {
        this.database = Connection.getInstance();
    }

    public connectOD(data: any, socketId: any): any {
        const identifier = data.user.id;
        const username = data.user.name;
        const locationName = data.location.description;
        const beacon = data.location.id;

        return this.database.user.findOrCreate({
            where: {id: identifier},
            defaults: {
                id: identifier,
                name: username,
                location: locationName,
                statusTime: Date.now(),
                socketId,
                beacon
            }
        }).spread((user, created) =>
        {
            if(user)
                return "SUCCESS";

            else
                throw Error("Failed to create or find user");

        }).catch((err) => {
            console.log(err);
            return "FAILED";
        });
    }

    public requestData(): any {
        return this.database.user.findAll().then((users) => {
            return {users};
        }).catch((err) => {
            return "Failed";
        });
    }

    public updateMessage(data): any {
        const message = data.message;
        return this.database.user.findById(data.user.id).then((user) => {
            let newMessage = user.message + message;
            return this.database.user.update({message: newMessage}, {where: {id: user.id}}).then(() => {
                return this.database.user.findAll().then((users) => {
                    return {users};
                });
            });
        });
    }

    public removeUser(user): any {
        return this.database.user.destroy({where: {id: user}}).then(() => {
            return "SUCCESS";
        }).catch((err) => {
            return "Failed";
        });
    }

    public findAllUsers(): any {
        return this.database.user.findAll({where: {isActive: true}}).then((users) => {
            return users;
        }).catch((err) => {
            return "Failed";
        });
    }

    public updateUsersAsInactive(users): void
    {
        for(let u of users)
        {
            this.database.user.update({isActive: false}, {where: {id: u.id}});
        }
    }

    public updateUserAsInactive(userId): void
    {
        this.database.user.update({isActive: false}, {where: {id: userId}});
    }

    public findUser(id: Number): any {
        return this.database.user.findById(id).then((user) => {
            return user;
        }).catch((err) => {
            return "Failed";
        });
    }


    public updateUserStatus(user): void {
        this.database.user.update({statusTime: Date.now()}, {where: {id: user.id}});
    }

    public userAnsweredCorrect(data){
        const isCorrect = data.correctAnswer;
        return this.database.user.findOne({
            where: {id: data.userId}
        }).then((user) => {
            if(isCorrect){
                let corrAnswer = user.correctAnswerCounter;
                return this.database.user.update({correctAnswerCounter: corrAnswer + 1}, {where: {id: user.id}}).then(() =>{
                    let allAnswer = user.answerCounter;
                    return this.database.user.update({answerCounter: allAnswer + 1}, {where: {id: user.id}}).then(() =>{
                        return this.database.user.findOne({
                            where: {id: data.userId}
                        });
                    });
                });
            }else{
                let allAnswer = user.answerCounter;
                return this.database.user.update({answerCounter: allAnswer + 1}, {where: {id: user.id}}).then(() =>{
                    return this.database.user.findOne({
                        where: {id: data.userId}
                    });
                });
            }
        });
    }

    public initialUserAnsweredCorrect(data){
        return this.database.user.findOne({
            where: {id: data.userId}
        }).then((user) => {
            return this.database.user.findOne({
                where: {id: data.userId}
            })
        });
    }

    public updateParticipationTime(data){
        return this.database.user.findOne({
            where: {id: data.userId}
        }).then((user) => {
            let participationQuizTime = user.participationTime;
            this.database.user.update({participationTime: participationQuizTime + data.participationQuizTime}, {where: {id: user.id}}).then(() => {
                return this.database.quizsession.create({
                        quizsessiontime: data.participationQuizTime,
                        timestamp: Date.now(),
                        userId: user.id
                });
            });
        });
    }

    public updateAnswerTime(data){
        return this.database.user.findOne({
            where: {id: data.userId}
        }).then((user) => {
            let answerTime = user.answerMeanTime;
            let answerMeanTimeCalc = (answerTime + data.quizAnswerTime)/2;
            this.database.user.update({answerMeanTime: answerMeanTimeCalc}, {where: {id: user.id}}).then(() => {
                return this.database.useranswer.create({
                    answertime: data.quizAnswerTime,
                    timestamp: Date.now(),
                    userId: user.id,
                    questionId: data.questionId,
                    correctAnswer: data.correctAnswer
                });
            });
        });
    }
}
