export class Store
{
    private static _instance: Store;
    private _location: any;
    private _leftTouchLocation: any;
    private _rightTouchLocation: any;
    private _leftTouchUser: any;
    private _rightTouchUser: any;

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

    get leftTouchUser(): any {
        return this._leftTouchUser;
    }

    set leftTouchUser(value: any) {
        this._leftTouchUser = value;
    }

    get rightTouchUser(): any {
        return this._rightTouchUser;
    }

    set rightTouchUser(value: any) {
        this._rightTouchUser = value;
    }

    get leftTouchLocation(): any {
        return this._leftTouchLocation;
    }

    set leftTouchLocation(value: any) {
        this._leftTouchLocation = value;
    }

    get rightTouchLocation(): any {
        return this._rightTouchLocation;
    }

    set rightTouchLocation(value: any) {
        this._rightTouchLocation = value;
    }
}
