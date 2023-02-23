import { _ } from "framework";
import { IoC, ioc } from "./ioc";
import { Provider } from "./provider";

export function registerProviders(serviceProviders) {
    serviceProviders.forEach((provider) => {
        // if (_.isUndefined(provider)) return ioc;

        if (!(provider instanceof Provider)) {
            console.error("Incorrect type of provider", provider);
            throw new Error("Incorrect type of provider");
        }

        provider.register(ioc);
    });

    return ioc;
}
