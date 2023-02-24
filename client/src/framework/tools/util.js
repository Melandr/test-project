const _ = {
    delay(ms = 1000) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    },

    //Функция для сохранения токена в sessionStorage
    saveToken(token) {
        sessionStorage.setItem("token", token);
    },

    //Функция чтения токена из sessionStorage
    getToken() {
        return sessionStorage.getItem("token");
    },

    isUndefined(d) {
        return typeof d === "undefined";
    },

    isNull(d) {
        return d === null;
    },

    isString(d) {
        return typeof d === "string";
    },

    isEmpty(d) {
        return d.length && d.length === 0;
    },
};

export { _ };
