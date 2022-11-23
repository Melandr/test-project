export class UserView {
    constructor(container) {
        this.container = container;
    }

    //вывод информации на страницу
    renderSucess(userName = "") {
        this.container.innerHTML = `${userName},<br>Вы успешно авторизованы.`;
    }

    //вывод ошибки на страницу при неудачном запросе
    renderFailure(err) {
        this.container.innerHTML = `Произошла ошибка. <br> ${err}`;
    }

    //отображение ошибки при валидации формы
    renderError(msg, attribute) {
        const element = this.container.querySelector(`[name="${attribute}"]`);
        const spanError = this.container.querySelector(`#error-${attribute}`);

        spanError.textContent = msg;

        spanError.classList.add("active");

        element.classList.add("error");
        element.classList.add("active");

        element.blur();
    }

    //очистка ошибки при валидации формы
    clearError(domObject) {
        const spanError = this.container.querySelector(`#error-${domObject.getAttribute("name")}`);

        spanError.textContent = "";
        spanError.classList.remove("active");

        domObject.classList.remove("error");
        domObject.classList.remove("active");
    }

    getFormData() {
        const from_login = this.container.querySelector('[name="login"]').value;
        const from_password = this.container.querySelector('[name="password"]').value;

        return {
            from_login,
            from_password,
        };
    }
}
