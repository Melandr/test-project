import { initComponents } from "./component/init-components";
import { initRouting } from "./routing/init-routing";
import { initDirectives } from "./directives/init-directives";
import { EventEmitter } from "../tools/event-emitter";
import { initPipes } from "./pipes/init-pipes";
import { initProviders } from "./providers/init-providers";

export class Module {
    constructor(config) {
        this.components = config.components;
        this.bootstrapComponent = config.bootstrap;
        this.routes = config.routes;
        this.directives = config.directives;
        this.pipes = config.pipes;
        this.providers = config.providers;

        this.dispatcher = new EventEmitter(this);
    }

    start() {
        initPipes(this.pipes);

        initComponents(this.bootstrapComponent, this.components);
        initRouting(this.routes, this.dispatcher);
        initDirectives(this.directives);
        initProviders(this.providers);

        this.dispatcher.host.addEventListener("routing.change-page", () => {
            initDirectives(this.directives);
        });
    }
}
