export class Store
{
    private static _instance: Store;
    private _location: any;
    private _touchLocation: any;
    private _touchUser: any;

    public static getInstance(): Store
    {
        if(Store._instance === null || Store._instance === undefined)
        {
            Store._instance = new Store();
        }

        return Store._instance;
    }

    get location(): any
    {
        return this._location;
    }

    set location(location: any)
    {
        this._location = location;
    }

    get touchLocation(): any {
        return this._touchLocation;
    }

    set touchLocation(value: any) {
        this._touchLocation = value;
    }

    get touchUser(): any {
        return this._touchUser;
    }

    set touchUser(value: any) {
        this._touchUser = value;
    }
}
