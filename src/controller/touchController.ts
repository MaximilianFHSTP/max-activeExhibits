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

        this.store.location = data.exhibit;

        for(let child of data.childLocations)
        {
            if(child.locationTag === 'left')
                this.store.leftTouchLocation = child;

            else if(child.locationTag === 'right')
                this.store.rightTouchLocation = child;
        }
    }

    public getLocationId()
    {
        return this.store.location.id;
    }

    public getLeftLocationId()
    {
        return this.store.leftTouchLocation.id;
    }

    public getRightLocationId()
    {
        return this.store.rightTouchLocation.id;
    }

    public getLeftUserId()
    {
        return (this.store.leftTouchUser) ? this.store.leftTouchUser.id : undefined;
    }

    public getRightUserId()
    {
        return (this.store.rightTouchUser) ? this.store.rightTouchUser.id : undefined;
    }
}