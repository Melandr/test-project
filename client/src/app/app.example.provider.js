import IoC from "../framework/core/providers/ioc";
import { WFMProvider } from "framework";

class ExampleProvider extends WFMProvider {
    /**
     * @param {IoC} ioc
     */
    register(ioc) {
        //регистрация строки (имя сайта)
        ioc.singleton("APP_TITLE", () => "GronMax App");
    }
}

export default new ExampleProvider();
