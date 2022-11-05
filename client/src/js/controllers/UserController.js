import UserModel from "../models/UserModel.js";
import { secret_key, api_url, auth_url } from "../config.js";
import { HmacSHA256, MD5 } from "crypto-js";
import { saveToken } from "../utils.js";

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

    this.getTokenData(
      formData,
      () => this.view.renderSucess(),
      () => this.view.renderFailure()
    );
  }

  //Функция для получения токена
  getTokenData(data, sucess, failure) {
    try {
      fetch(api_url + auth_url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          if (response.status === 200) {
            const request = await response.json();
            const tokenData = request.token;
            saveToken(JSON.stringify(tokenData));
            sucess();
          }

          if (response.status === 404) {
            const request = await response.json();
            throw new Error(request.detail);
          }
        })
        .catch(async (err) => {
          console.log(err);
          failure();
        });
    } catch (err) {
      console.error(`Error at fetch POST: ${err}`);
      throw err;
    }
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
