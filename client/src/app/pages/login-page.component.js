import { WFMComponent, ioc, router, $, _, validateField, http, jwt } from "framework";
import { secret_key, api_url, auth_url, detail_url, proxy_url } from "../config.js";

import { registerProviders } from "../../framework/core/providers/register-providers.js";
import { APP_TITLE_TOKEN } from "../services/contracts";
import ExampleServiceProvider from "../services/example.service-provider";
import { ExampleService } from "../services/example.service";
import DataServiceProvider from "../services/data.service-provider";
import { DataService } from "../services/data.service";

class LoginPageComponent extends WFMComponent {
    constructor(config) {
        super(config);

        this.data = {
            linkTitle: "Перейти на главную",
            login: "",
            password: "",
        };
    }

    events() {
        return {
            "click .js-link": "goToHome",
            "click .submit": "submitForm",
            "blur #login-input": "clearError",
            "blur #password-input": "clearError",
        };
    }

    goToHome(event) {
        event.preventDefault();
        router.setRoute("/");
    }

    //функция отправки данных из формы на сервер
    submitForm(event) {
        event.preventDefault();

        const dataService = this.ioc.use(DataService);
        const form = this.el.find("#form");
        const fields = [...form.findAll("[name]")];

        try {
            // проверяем поля на количество символов
            fields.forEach((field) => {
                let minlength = 3;

                this.validation(field.getValue(), field.attr("name"), minlength);
            });

            if (fields.every((field) => field.hasClass("error"))) return console.log("Что-то пошло не так...");

            //получаем пароль из поля формы и преобразуем пароль в хэшированный вид
            const hashedPassword = jwt.hashPassword(this.getFormData().password);

            const formData = {
                login: this.getFormData().login,
                password: hashedPassword,
            };

            this.getTokenData(formData)
                .then((data) => {
                    dataService.setMessage(data);
                    router.setRoute("/info");
                })
                .catch((data) => {
                    dataService.setError(data);
                    router.setRoute("/info");
                });
        } catch (err) {
            console.log(err);
        }
    }

    clearContainerIOC() {

    }

    //функция валидации формы
    validation(domObject, typeDomObject, minlength) {
        try {
            validateField(domObject, typeDomObject, minlength);
        } catch (err) {
            this.renderError(err.message, typeDomObject);
            throw err;
        }
    }

    //функция получения данных из полей формы
    getFormData() {
        const form = this.el.find("#form");

        this.data.login = form.find('[name="login"]').getValue();
        this.data.password = form.find('[name="password"]').getValue();

        return {
            login: this.data.login,
            password: this.data.password,
        };
    }

    //отображение ошибки при валидации формы
    renderError(msg, attribute) {
        const $element = this.el.find(`[name="${attribute}"]`);
        const $spanError = this.el.find(`#error-${attribute}`);

        $spanError.textContent = msg;

        $spanError.addClass("active");

        $element.addClass("error");
        $element.addClass("active");
    }

    //очистка ошибки при валидации формы
    clearError({ target }) {
        const $spanError = this.el.find(`#error-${$(target).attr("name")}`);
        // console.log(spanError);
        $spanError.textContent = "";
        $spanError.removeClass("active");
        $(target).removeClass("error");
        $(target).removeClass("active");
    }

    //функция получения токена авторизации
    getTokenData(response) {
        const url = proxy_url + auth_url;

        const result = http
            .post(url, response)
            .then((response) => response.json())
            .then((data) => {
                _.saveToken(data.token);

                return Promise.resolve(data.token);
            })
            .catch((error) => {
                // console.log(error);
                return Promise.reject(error);
                //тут нужно вывести текст ошибки
            });

        return result;
    }

    //Функция получения детальной информации о пользователе
    getUserDetailInfo(sucess) {
        const url = proxy_url + detail_url;

        const options = {
            method: "GET",
            headers: {
                tmst: jwt._formatDate(),
                token: _.getToken(),
                sign: jwt.createSign(api_url + detail_url, _.getToken(), secret_key),
            },
        };

        return fetch(url, options).then((response) => {
            if (response.status === 200) {
                return response.json().then((request) => {
                    console.log(response);
                    const name = request.name;
                    sucess(name);
                });
            }
        });
    }
}

export const loginPageComponent = new LoginPageComponent({
    selector: "app-login-page",
    template: `
    <div class="form-container">
        <form class="form" id="form">
            <div class="title">Авторизация</div>
            <div class="input-container ic1">
                <input id="login-input" name="login" class="input" type="text" placeholder=" " />
                <div class="cut"></div>
                <label for="login-input" class="placeholder">Логин</label>
            </div>
            <span class="error" id="error-login">пожалуйста, введите логин</span>
            <div class="input-container ic2">
                <input id="password-input" name="password" class="input" type="password" placeholder=" " />
                <div class="cut"></div>
                <label for="password-input" class="placeholder">Пароль</label>
            </div>
            <span class="error" id="error-password">пожалуйста, введите пароль</span>
            <button type="text" class="submit" id="submit">Отправить</button>
            <div id="loader" class="hidden">Отправляем...</div>
        </form>
    </div>
        <div class="link__block">
            <a href="#not-existing-path" class="js-link nav__link">{{linkTitle}}</a>  
        </div>        
    `,
    styles: `
        .link__block {display: flex; justify-content: center; margin-top: 30px;}
    `,
    providers: [DataServiceProvider],
    ioc: ioc,
});
