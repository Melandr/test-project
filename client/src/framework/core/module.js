import { initComponents } from "./component/init-components";
import { initRouting } from "./routing/init-routing";
import { initDirectives } from "./directives/init-directives";
import { EventEmitter } from "../tools/event-emitter";
import { initPipes } from "./pipes/init-pipes";
import { registerProviders } from "./providers/register-providers";

import { APP_TITLE_TOKEN } from "../../app/services/contracts";
import { ExampleService } from "../../app/services/example.service";

export class Module {
    constructor(config) {
        this.components = config.components;
        this.bootstrapComponent = config.bootstrap;
        this.routes = config.routes;
        this.directives = config.directives;
        this.pipes = config.pipes;
        this.ioc = config.ioc;

        this.dispatcher = new EventEmitter(this);
    }

    start() {
        initPipes(this.pipes);

        initComponents(this.bootstrapComponent, this.components);
        initRouting(this.routes, this.dispatcher);
        initDirectives(this.directives);

        this.dispatcher.host.addEventListener("routing.change-page", () => {
            initDirectives(this.directives);
        });
    }

    runServices() {
        // const appTitle = this.ioc.use(APP_TITLE_TOKEN);
        // console.log(appTitle);
        /**@type {ExampleService} */
        // const exampleService = this.ioc.use(ExampleService);
        // exampleService.run();
        // console.log("exampleService", exampleService);
    }
}
