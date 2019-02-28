import {Store} from "../database";

export class UnityController
{
    private _store: Store;
    private _godSocket;

    constructor(godSocket: any)
    {
        this._store = Store.getInstance();
        this._godSocket = godSocket;
    }

    public getPlayer(req: any, res: any): void
    {
        const user = this._store.touchUser;

        res.status(200).json({godUser: user});
    }

    public unlockCoaPart(req: any, res: any, isHelmet: boolean): void
    {
        const user = this._store.touchUser;
        if(!user)
        {
            res.status(400).json('No user found');
            return;
        }

        let coaId = process.env.UNLOCK_COA_SYMBOL_ID;

        if(isHelmet)
            coaId = process.env.UNLOCK_COA_HELMET_ID;

        this._godSocket.emit('unlockCoaPartFromExhibit', {userId: user.id, coaId});

        res.status(200).send();
    }

    public userTimedOut(req: any, res: any): void
    {
        const location = this._store.touchLocation.id;
        const user = this._store.touchUser.id;
        const parentLocation = this._store.location.id;
        this._godSocket.emit('disconnectedFromExhibit', {location, parentLocation, user});

        res.status(200).send();
    }

    public localUserJoined(req: any, res: any): void
    {
        const location = this._store.touchLocation.id;
        this._godSocket.emit('updateSeat', {location});

        res.status(200).send();
    }

    public localUserLeft(req: any, res: any): void
    {
        const location = this._store.touchLocation.id;
        const parentLocation = this._store.location.id;
        this._godSocket.emit('disconnectedFromExhibit', {location, parentLocation});

        res.status(200).send();
    }
}