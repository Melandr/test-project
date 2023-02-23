export class IoC {
    constructor() {
        this._resolvers = {};
        this._isSingleton = {};
        this._resolvingHandlers = {};
        this._resolvedInstances = {};
    }

    //подключает сервис в классе
    use(token) {
        if (!this._resolvers[token]) {
            throw new Error(`Resolver for token ${token} doesn't exist`);
        }

        if (this._resolvedInstances[token]) {
            return this._resolvedInstances[token];
        }

        let instance = this._resolvers[token](this);

        const handlers = this._resolvingHandlers[token] || [];

        for (let handler of handlers) {
            instance = handler({ instance, ioc: this });
        }

        if (this._isSingleton[token]) {
            this._resolvedInstances[token] = instance;
        }

        return instance;
    }

    //для связи токена и функции которая будет создавать объект
    bind(token, resolver) {
        this._resolvers[token] = resolver;
    }

    //делает то же самое, но при этом возвращает ранее созданные объекты при повторном запросе
    singleton(token, resolver) {
        this._isSingleton[token] = true;
        this.bind(token, resolver);
    }

    //позволяет добавлять функцию которая вызовется в момент создания нового инстанса, условно я хочу после создания axios что-то сделать с объектом перед тем как его получит клиент. Это именно то место где это можно сделать
    resolving(token, handler) {
        this._resolvingHandlers[token] = this._resolvingHandlers[token]
            ? [...this._resolvingHandlers[token], handler]
            : [handler];
    }

    //регистрирует сервис-провайдер в контейнере
    register(serviceProvider) {
        serviceProvider.register(this);
    }
}

export const ioc = new IoC();
