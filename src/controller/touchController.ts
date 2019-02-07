import {Store} from "../database";

export class TouchController
{
    private store: Store;

    constructor() {
        this.store = Store.getInstance();
    }

    public updateTouchUser(location: any, user: any)
    {
        if(this.isLeftLocation(location.id))
            this.store.leftTouchUser = user;

        else
            this.store.rightTouchUser = user;
    }

    public isLeftLocation(checkId: any)
    {
        return checkId === this.store.leftTouchLocation.id;
    }

    public deleteTouchUser(location: any)
    {
        if(this.isLeftLocation(location.id))
            this.store.leftTouchUser = undefined;

        else
            this.store.rightTouchUser = undefined;
    }

    public updateTouchLocations(data: any)
    {
        if(!data)
            return;

        this.store.location = data.location;
        this.store.leftTouchLocation = data.leftLocation;
        this.store.rightTouchLocation = data.rightLocation;
    }

    public getLeftLocationId()
    {
        return this.store.leftTouchLocation.id;
    }

    public getRightLocationId()
    {
        return this.store.leftTouchLocation.id;
    }
}