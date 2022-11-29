const Router = (() => {
    let _rootEl;
    let _routes;
    let _NotFound;

    const init = (rootEl, routes, NotFound = () => "404") => {
        _rootEl = rootEl;
        _routes = routes;
        _NotFound = NotFound;
    };

    const render = (path) => {
        const chunks = path.split("/");
        const resource = chunks.length > 2 ? chunks.pop() : undefined;
        const page = chunks.join("/");
        const toRender = (_routes[page] || _NotFound)(resource);

        // A component can return either a template string or a DOM element
        if (typeof toRender === "string") {
            _rootEl.innerHTML = toRender;
        } else {
            _rootEl.textContent = "";
            _rootEl.appendChild(toRender);
        }

        // Find all of the links that begin with `/` and plug them into the router
        _rootEl.querySelectorAll('[href^="/"]').forEach((el) =>
            el.addEventListener("click", (evt) => {
                evt.preventDefault();
                redirect(new URL(evt.target.href).pathname);
            })
        );
    };

    function redirect(path) {
        window.history.pushState({ path }, path, path);
        render(path);
    }

    return { init, render, redirect };
})();

export const { render, redirect } = Router;
export default Router;
