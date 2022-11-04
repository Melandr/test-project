import UserModel from "../models/UserModel.js";
import { HmacSHA256, SHA256, MD5 } from "crypto-js";

export class UserController {
  constructor(view, service, model) {
    this.view = view;
    this.service = service;
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
      from_login,
      hashedPassword,
    };

    // let json = JSON.stringify(formData);
    // console.log(json);

    this.service.sendFormData(
      formData,
      () => this.view.renderSucess(),
      () => this.view.renderFailure()
    );
  }

  validation(domObject, typeDomObject, minlength) {
    try {
      this.service.validation(domObject, typeDomObject, minlength);
    } catch (e) {
      this.view.renderError(e.message, typeDomObject);
    }
  }

  outError(domObject) {
    this.view.outError(domObject);
  }
}
