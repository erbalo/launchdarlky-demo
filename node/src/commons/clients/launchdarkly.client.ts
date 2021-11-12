import { LDClient, LDUser } from "launchdarkly-node-server-sdk";
import * as LauchDarkly from "launchdarkly-node-server-sdk"
import Logger from "../logger";
import { LaunchDarklyClient } from "../../interfaces/launchdarkly.interface";

const LD_USER: LDUser = {
    key: 'erick.barrera@casai.com'
}

export class LaunchDarkly {
    private static instance: LaunchDarkly;
    private client: LDClient;

    private constructor() {
        this.initLaunchDarklyConfig()
    }

    public static getInstance(): LaunchDarkly {
        if (!LaunchDarkly.instance) {
            LaunchDarkly.instance = new LaunchDarkly();
        }

        return LaunchDarkly.instance;
    }

    private initLaunchDarklyConfig() {
        this.client = LauchDarkly.init("SDK_KEY")
        try {
            // initialization complete
            (async ()=> {
                await this.client.waitForInitialization();
            })();         
        } catch (err) {
            // initialization failed
            Logger.error(err)
        }
    }

    public async isActive(flag: string): Promise<boolean> {
        const value = await this.client.variation(flag, LD_USER, false);
        Logger.info(`Getting value from [${flag}]=${value}`)
        return value;
    }

    public async metadata(flag: string): Promise<Object> {
        const value = await this.client.variation(flag, LD_USER, null);
        const objectJson = JSON.stringify(value);
        Logger.info(`Getting value from [${flag}]=${objectJson}`)
        return value;
    }

    public async numberData(flag: string): Promise<number> {
        const value = await this.client.variation(flag, LD_USER, -1);
        Logger.info(`Getting value from [${flag}]=${value}`)
        return value;
    }
}

let launchDarklyClient = null;

if(!launchDarklyClient) {
    launchDarklyClient = {};
    launchDarklyClient['instance'] = LaunchDarkly.getInstance();
}

export default <LaunchDarklyClient>launchDarklyClient;