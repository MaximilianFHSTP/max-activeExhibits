import { UnityController } from "../controller";
import { RestController } from "./restController";
import { RoutesInterface } from "./routesInterface";

export class UnityRestController extends RestController implements RoutesInterface
{

    constructor(app: any, godSocket: any)
    {
        super(app, new UnityController(godSocket));
        this.setRoutes();
    }

    setRoutes(): void
    {
        // unity Routes
        this.app.route('/unity/player')
            .get((req, res) => this.controller.getPlayer(req, res));

        this.app.route('/unity/player/local/joined')
            .get((req, res) => this.controller.localUserJoined(req, res));

        this.app.route('/unity/player/local/left')
            .get((req, res) => this.controller.localUserLeft(req, res));

        this.app.route('/unity/player/timeout')
            .get((req, res) => this.controller.userTimedOut(req, res));

        this.app.route('/unity/unlock/helmet')
            .get((req, res) => this.controller.unlockCoaPart(req, res, true));

        this.app.route('/unity/unlock/symbol')
            .get((req, res) => this.controller.unlockCoaPart(req, res, false));
    }
}