import { EventEmitter } from "../../tools/event-emitter";

const ROUTER_TYPES = {
        hash: "hash",
        history: "history",
    },
    defer = (x) => {
        setTimeout(() => x(), 10);
    };

/**
 * SPA Router - replacement for Framework Routers (history and hash).
 */
export class Router {
    #type = ROUTER_TYPES.hash;
    #routes;
    constructor() {
        this.events = new EventEmitter(this);
    }

    set routes(value) {
        this.#routes = value;
    }

    set type(value) {
        this.#type = value;
    }
    /**
     * Start listening for route changes.
     * @returns {VanillaRouter} reference to itself.
     */
    listen() {
        const routs = this.#routes.map((route) => route.path);

        this.routeHash = Object.values(routs);

        // if (!this.routeHash.includes("/")) throw TypeError("No home route found");

        if (this.isHashRouter) {
            window.addEventListener("hashchange", this._hashChanged.bind(this));
            defer(() => this._tryNav(document.location.hash.substring(1)));
        } else {
            let href = document.location.origin;
            if (this._findRoute(document.location.pathname)) {
                href += document.location.pathname;
            }
            document.addEventListener("click", this._onNavClick.bind(this));
            window.addEventListener("popstate", this._triggerPopState.bind(this));

            defer(() => this._tryNav(href));
        }
        return this;
    }

    _hashChanged() {
        this._tryNav(document.location.hash.substring(1));
    }

    _triggerPopState(e) {
        console.log(this);
        this._triggerRouteChange(e.state.path, e.target.location.href);
    }

    _triggerRouteChange(path, url) {
        this.events.emit("route", {
            route: this.#routes[path],
            path: path,
            url: url,
        });
    }

    //метод поиска маршрута в массиве маршрутов
    _findRoute(url) {
        var test =
            "/" +
            url.match(/([A-Za-z_0-9.]*)/gm, (match, token) => {
                return token;
            })[1];
        // console.log(this.routeHash, url, test);
        return this.routeHash.includes(test) ? test : "**";
    }

    //метод проверяет наличие маршрута в массиве маршрутов и создает новую запись в истории
    _tryNav(href) {
        const url = this._createUrl(href);

        if (url.protocol.startsWith("http")) {
            const routePath = this._findRoute(url.pathname);

            if (routePath && this.#routes.find((r) => r.path === routePath)) {
                if (this.#type === "history") {
                    window.history.pushState({ path: routePath }, routePath, url.origin + url.pathname);
                }

                this._triggerRouteChange(routePath, url);
                return true;
            }
        }
    }

    _createUrl(href) {
        if (this.isHashRouter && href.startsWith("#")) {
            href = href.substr(1);
        }
        return new URL(href, document.location.origin);
    }

    //метод отменяет действие по умолчанию при клике по ссылке, если маршрут есть в массиве маршрутов
    _onNavClick(e) {
        // обрабатывает клик в документе
        const href = e.target?.closest("[href]")?.href;

        e.preventDefault();

        this._tryNav(href);
    }

    /**
     * Заставляет маршрутизатор перейти к заданному маршруту
     * @param {String} path
     */
    setRoute(path) {
        if (!this._findRoute(path)) throw TypeError("Invalid route");

        let href = this.isHashRouter ? "#" + path : document.location.origin + path;
        history.replaceState(null, null, href);
        this._tryNav(href);
    }

    get isHashRouter() {
        return this.#type === ROUTER_TYPES.hash;
    }
}

export const router = new Router();
