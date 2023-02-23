import IoC from "../../framework/core/providers/ioc";
import { WFMProvider } from "framework";
import { DataService } from "./data.service";

class DataServiceProvider extends WFMProvider {
    /**
     * @param {IoC} ioc
     */
    register(ioc) {
        ioc.singleton(DataService, () => new DataService(ioc));
    }
}

export default new DataServiceProvider();
