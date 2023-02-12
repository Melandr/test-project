import { IoC } from "./ioc";
import { Provider } from "./provider";

export function initProviders(providers) {
    const ioc = new IoC();

    providers.forEach((provider) => {
        if (!(provider instanceof Provider)) {
            console.error("Incorrect type of provider", provider);
            throw new Error("Incorrect type of provider");
        }

        provider.register(ioc);
    });

    return ioc;
}
