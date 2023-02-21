import IoC from "../framework/core/providers/ioc";
import { WFMProvider } from "framework";
import { APP_TITLE_TOKEN } from "./contracts";
import { ExampleService } from "./app.example.service";

class ServiceProvider extends WFMProvider {
    /**
     * @param {IoC} ioc
     */
    register(ioc) {
        //регистрация строки (имя сайта)
        console.log(ioc);
        ioc.singleton(APP_TITLE_TOKEN, () => "GromMax App");

        ioc.resolving(APP_TITLE_TOKEN, (ctx) => `<h1>${ctx.instance}</h1>`);
        //регистрация сервиса
        ioc.singleton(ExampleService, () => new ExampleService(ioc));
    }
}

export default new ServiceProvider();
