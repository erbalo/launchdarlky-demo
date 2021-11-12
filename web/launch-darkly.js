const CONFIG = {
    DEFAULT_LAUNCH_DARKLY_USER: 'erick.barrera@casai.com',
    LAUNCH_DARKLY_KEY: 'client-key'
}

const USER = {
    "key": CONFIG.DEFAULT_LAUNCH_DARKLY_USER
};

const docReady = doFunction => {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(doFunction, 1);
    } else {
        document.addEventListener("DOMContentLoaded", doFunction);
    }
}

class LaunchDarkly {
    static instance = null;
    client = null;

    constructor(){}

    static async getInstance() {
        if (!LaunchDarkly.instance) {
            LaunchDarkly.instance = new LaunchDarkly();
            await LaunchDarkly.instance.initLaunchDarklyConfig();
        }

        return LaunchDarkly.instance;
    }

    async initLaunchDarklyConfig() {
        this.client = LDClient.initialize(CONFIG.LAUNCH_DARKLY_KEY, USER)
        await this.client.identify(USER);
    }

    isActive(flag) {
        const value = this.client.variation(flag, false);
        console.log(`Getting value from [${flag}]=${value}`)
        return value;
    }

    metadata(flag) {
        const value = this.client.variation(flag, null);
        const objectJson = JSON.stringify(value);
        console.log(`Getting value from [${flag}]=${objectJson}`)
        return value;
    }

    numberData(flag) {
        const value = this.client.variation(flag, -1);
        console.log(`Getting value from [${flag}]=${value}`)
        return value;
    }
}

docReady(async () => {
    console.log("Content loaded");

    const isActiveFlag = (await LaunchDarkly.getInstance()).isActive("demo-launch-darkly-boolean-flag")
    const jsonFlag = (await LaunchDarkly.getInstance()).metadata("demo-launch-darkly-json-flag")
    const numberFlag = (await LaunchDarkly.getInstance()).numberData("demo-launch-darkly-number-flag")

    const div = document.getElementById('content');
    let strHTML = '<p>Bolean flag: ' + isActiveFlag + '</p>'
    strHTML += `
        <p>Json flag: ${jsonFlag}</p>
        <p>Number flag: ${numberFlag}</p>
    `;

    div.innerHTML = strHTML;
});