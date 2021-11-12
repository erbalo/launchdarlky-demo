import { LaunchDarklyClient } from "../interfaces/launchdarkly.interface";
import { ServiceLoader } from "../interfaces/serviceloader.interface";
import { UserService } from "./user.service";

export class ServiceFactory {

    constructor(
        private launchDarklyClient: LaunchDarklyClient
    ){}

    loaders(): ServiceLoader {
        const userService: UserService = new UserService(this.launchDarklyClient);

        return {
            userService
        }
    }

}