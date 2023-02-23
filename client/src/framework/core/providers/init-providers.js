import { IoC, ioc } from "./ioc";
import { Provider } from "./provider";

export function initProviders(serviceProviders) {
    // const ioc = new IoC();

    serviceProviders.forEach((provider) => {
        if (!(provider instanceof Provider)) {
            console.error("Incorrect type of provider", provider);
            throw new Error("Incorrect type of provider");
        }

        provider.register(ioc);
    });

    return ioc;
}
