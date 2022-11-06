import UserModel from "../models/UserModel.js";
import { secret_key, api_url, auth_url, detail_url } from "../config.js";
import { MD5 } from "crypto-js";
import { createSign, formatDate, saveToken, getToken } from "../utils.js";

export class UserController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  submit(dataDOM) {
    const fields = [...dataDOM.querySelectorAll("[name]")];

    //проверяем поля на количество символов
    // fields.forEach((field) => {
    //   let minlength = 3;
    // });

    if (fields.every((field) => field.classList.contains("error"))) return console.log("Что-то пошло не так...");

    const from_login = dataDOM.querySelector('[name="login"]').value;
    const from_password = dataDOM.querySelector('[name="password"]').value;

    const hashedPassword = MD5(from_password).toString();

    const formData = {
      login: from_login,
      password: hashedPassword,
    };

    this.getTokenData(formData)
      .then(this.getUserDetailInfo.bind(this))
      .catch((err) => {
        console.log(err);
      });
  }

  //Функция для получения токена
  getTokenData(data) {
    const url = api_url + auth_url;

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
    const url = api_url + detail_url;

    const options = {
      method: "GET",
      headers: { tmst: formatDate(), token: getToken(), sign: createSign(url, getToken(), secret_key) },
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
      this.service.validation(domObject, typeDomObject, minlength);
    } catch (e) {
      this.view.renderError(e.message, typeDomObject);
    }
  }

  clearError(domObject) {
    this.view.clearError(domObject);
  }
}
