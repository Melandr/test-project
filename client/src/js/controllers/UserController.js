import UserModel from "../models/UserModel.js";
import { secret_key, api_url, auth_url, detail_url, proxy_url } from "../config.js";
import { MD5 } from "crypto-js";
import { createSign, formatDate, saveToken, getToken, validation } from "../utils.js";

export class UserController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.getUserDetailInfo = this.getUserDetailInfo.bind(this);
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

            this.getTokenData(formData)
                .then(this.getUserDetailInfo())
                .catch((err) => {
                    return false;
                });
        } catch (err) {
            return false;
        }
    }

    //Функция для получения токена
    getTokenData(data) {
        const url = proxy_url + auth_url;

        const options = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        };

        return fetch(url, options)
            .then((response) => {
                if (response.status === 200) {
                    return response.json().then((request) => {
                        const tokenData = request.token;
                        saveToken(tokenData);
                    });
                }

                if (response.status === 404) {
                    return response
                        .json()
                        .then((request) => {
                            const err = request.detail;
                            this.view.renderFailure(err);
                            throw new Error(err);
                        })
                        .catch((err) => {
                            throw err;
                            // return Promise.reject(new Error(error.detail));
                        });
                }
            })
            .catch((err) => {
                throw err;
            });
    }

    //Функция получения детальной информации о пользователе
    getUserDetailInfo() {
        const url = proxy_url + detail_url;

        const options = {
            method: "GET",
            headers: {
                tmst: formatDate(),
                token: getToken(),
                sign: createSign(api_url + detail_url, getToken(), secret_key),
            },
        };

        return fetch(url, options).then((response) => {
            if (response.status === 200) {
                return response.json().then((request) => {
                    const login = request.name;
                    this.view.renderSucess(login);
                });
            }
        });
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
