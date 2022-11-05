import "../css/styles.css";
//модули
import { UserController } from "./controllers/UserController";
import { UserModel } from "./models/UserModel";
import { UserView } from "./views/UserView";

//DOM
const form = document.querySelector("#form");
const fields = form.querySelectorAll("[name]");

//экземпляры модулей
const userModel = new UserModel();
const userView = new UserView(form);
const userController = new UserController(userView, userModel);

//обработчик отправки формы
form.addEventListener("submit", submitForm);

function submitForm(evt) {
  evt.preventDefault();

  userController.submit(evt.currentTarget);
}

//удаление класса ошибки из полей формы
fields.forEach((field) => field.addEventListener("focus", clearError));

function clearError(evt) {
  userController.clearError(evt.currentTarget);
}
