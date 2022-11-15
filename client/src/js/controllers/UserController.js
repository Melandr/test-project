import { MD5 } from "crypto-js";
import { createSign, formatDate, saveToken, getToken, validation } from "../utils.js";

export class UserController {
    constructor(view, service, model) {
        this.view = view;
        this.service = service;
        this.model = model;
    }

    submit(dataDOM) {
        const fields = [...dataDOM.querySelectorAll("[name]")];

        try {
            // проверяем поля на количество символов
            fields.forEach((field) => {
                let minlength = 3;

                this.validation(field.value, field.getAttribute("name"), minlength);
            });

            if (fields.every((field) => field.classList.contains("error")))
                return console.log("Что-то пошло не так...");

            //получаем данные из полей формы
            const { from_login, from_password } = this.view.getFormData();
            //получаем хэшированный
            const hashedPassword = MD5(from_password).toString();

            const formData = {
                login: from_login,
                password: hashedPassword,
            };

            this.service
                .getTokenData(formData, (err) => this.view.renderFailure(err))
                .then(() => this.service.getUserDetailInfo((name) => this.view.renderSucess(name)))
                .catch((err) => {
                    return false;
                });
        } catch (err) {
            return false;
        }
    }

    validation(domObject, typeDomObject, minlength) {
        try {
            validation(domObject, typeDomObject, minlength);
        } catch (err) {
            this.view.renderError(err.message, typeDomObject);
            throw err;
        }
    }

    clearError(domObject) {
        this.view.clearError(domObject);
    }
}
