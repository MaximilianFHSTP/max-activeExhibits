import {Connection} from '../database';
import {Op} from 'sequelize';

export class GuestlistController {
    private database: Connection;
    private buergertum: any;

    constructor() {
        this.database = Connection.getInstance();
    }

    public getGuestListData(): any{
        return this.database.user.findAll({
            where: {correctAnswerCounter: {[Op.between]: [7,12]}},
            limit: 6,
            order: [['updatedAt', 'DESC']]
        }).then((users) => {
            this.buergertum = users;
            return this.database.user.findAll({
                where: {correctAnswerCounter: {[Op.gt]: 12}},
                limit: 8,
                order: [['updatedAt', 'DESC']]
            }).then((users) => {
                const guestlistUsers = {adel: users, buergertum: this.buergertum};
                return {guestlistUsers};
                }).catch((err) => {
                    return "Failed";
                });
            });
    }
}