import { ServiceFactory } from "./service.factory";
import launchDarklyClient from '../commons/clients/launchdarkly.client';

const serviceFactoryInstance = new ServiceFactory(launchDarklyClient);
const serviceLoaders = serviceFactoryInstance.loaders();

export default serviceLoaders;