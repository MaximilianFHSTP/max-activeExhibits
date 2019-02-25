import {Store} from "../database";

export class TouchController
{
    private store: Store;

    constructor() {
        this.store = Store.getInstance();
    }

    public updateTouchUser(user: any)
    {
        this.store.touchUser = user;
    }

    public deleteTouchUser()
    {
        this.store.touchUser = undefined;
    }

    public updateTouchLocations(data: any)
    {
        if(!data)
            return;

        this.store.location = data.exhibit;

        for(let child of data.childLocations)
        {
            this.store.touchLocation = child;
        }
    }

    public getLocationId()
    {
        return this.store.location.id;
    }

    public getTouchLocationId()
    {
        return this.store.touchLocation.id;
    }

    public getUserId()
    {
        return this.store.touchUser.id;
    }
}