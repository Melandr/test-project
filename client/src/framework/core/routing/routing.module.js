import { _ } from "../../tools/util";
import { Router } from "./router";
// import { appRoutes } from "../../../app/app.routes";
import { renderComponent } from "../component/render-component";
import { $ } from "../../tools/dom";

const options = {
    type: "history",
    routes: {
        "/": "home",
        "/about": "about",
        "/products": "products",
    },
};

// const router = new Router(options);

export class RoutingModule {
    constructor(routes, dispatcher) {
        this.routes = routes;
        this.router = new Router(options);
        this.dispatcher = dispatcher;
    }

    init() {
        // window.addEventListener("hashchange", renderRoute.bind(this));
        this.router.listen().on("route", renderRoute.bind(this));

        // renderRoute.call(this);
    }
}

function renderRoute(e) {
    console.log(this.routes);
    console.log(this.router);
    // let url = router.getUrl();
    // console.log(router);
    // let route = this.routes.find((r) => r.path === url);
    // console.log(route);
    // if (_.isUndefined(route)) {
    //     route = this.routes.find((r) => r.path === "**");
    // }
    // $("router-outlet").html(`<${route.component.selector}></${route.component.selector}>`);
    // renderComponent(route.component);
    // this.dispatcher.emit("routing.change-page");
}
