import Logger from '../commons/logger';
import { cloneArray } from '../utils/utils';
import { LaunchDarklyClient } from '../interfaces/launchdarkly.interface';
import { UserRepresentation } from '../representations/user.representation';

const users: UserRepresentation[] = [{
    id: 1,
    name: "Pepe",
    age: 46,
    savings: 20
},
{
    id: 2,
    name: "Pancho",
    age: 10,
    savings: 5
},
{
    id: 3,
    name: "Juancho",
    age: 30,
    savings: 100
}]

export class UserService {

    constructor(
        private launchDarklyClient: LaunchDarklyClient
    ) { }

    async findAll(): Promise<UserRepresentation[]> {
        const isActiveFlag = await this.launchDarklyClient.instance.isActive("demo-launch-darkly-boolean-flag")
        const jsonFlag = await this.launchDarklyClient.instance.metadata("demo-launch-darkly-json-flag")
        const numberFlag = await this.launchDarklyClient.instance.numberData("demo-launch-darkly-number-flag")

        const usersList = cloneArray(users);
        usersList.map((user: UserRepresentation) => {
            const newUsername = `${user.name} ${jsonFlag["label"]}`
            user.name = newUsername;

            if(numberFlag) {
                user.savings *= numberFlag 
            }

            return user;
        });

        return isActiveFlag ? usersList : [];
    }

}