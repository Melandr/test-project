// Simple Vanilla JS Event System
class Emitter {
    constructor(obj) {
        this.obj = obj;
        this.eventTarget = document.createDocumentFragment();
        ["addEventListener", "dispatchEvent", "removeEventListener"].forEach(this.delegate, this);
    }

    delegate(method) {
        this.obj[method] = this.eventTarget[method].bind(this.eventTarget);
    }
}

export class EventEmitter {
    constructor(host) {
        this.host = host;
        new Emitter(host); // add simple event system

        this.host.on = this.on;
    }

    on(event, func) {
        this.addEventListener(event, func);

        return this;
    }

    emit(event, detail, ev) {
        if (typeof event === "object" && event instanceof Event) return this.host.dispatchEvent(event);

        if (!ev) ev = new Event(event, { bubbles: false, cancelable: true });

        ev.detail = { ...(detail || {}), host: this.host };

        return this.host.dispatchEvent(ev);
    }
}
