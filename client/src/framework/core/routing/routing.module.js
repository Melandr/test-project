import { _ } from "../../tools/util";
import { Router } from "./router";
import { renderComponent } from "../component/render-component";
import { $ } from "../../tools/dom";

export class RoutingModule {
    constructor(routes, dispatcher) {
        this.routes = routes;
        this.router = new Router({ type: "history", routes });
        this.dispatcher = dispatcher;
    }

    init() {
        this.router.listen().on("route", renderRoute.bind(this));

        // renderRoute.call(this);
    }
}

function renderRoute(e) {
    let url = e.detail.path;
    let route = this.routes.find((r) => r.path === url);

    $("router-outlet").html(`<${route.component.selector}></${route.component.selector}>`);
    renderComponent(route.component);
    this.dispatcher.emit("routing.change-page");
}
