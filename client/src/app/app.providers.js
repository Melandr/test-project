import IoC from "../framework/core/providers/ioc";
import { WFMProvider } from "framework";
import { APP_TITLE_TOKEN } from "./contracts";
import { ExampleService } from "./app.example.service";

class ExampleProvider extends WFMProvider {
    /**
     * @param {IoC} ioc
     */
    register(ioc) {
        //регистрация строки (имя сайта)
        ioc.singleton(APP_TITLE_TOKEN, () => "GromMax App");

        ioc.resolving(APP_TITLE_TOKEN, (ctx) => `<h1>${ctx.instance}</h1>`);

        ioc.singleton(ExampleService, () => new ExampleService(ioc));
    }
}

export default new ExampleProvider();
