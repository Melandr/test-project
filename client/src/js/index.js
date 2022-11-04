import "../css/styles.css";
//модули
import { UserController } from "./controllers/UserController";
import { UserService } from "./services/UserService";
import { UserView } from "./views/UserView";

//DOM
const form = document.querySelector("#form");
const fields = form.querySelectorAll("[name]");

//экземпляры модулей
const userService = new UserService();
const userView = new UserView(form);
const userController = new UserController(userView, userService);

//обработчик отправки формы
form.addEventListener("submit", submitForm);

function submitForm(evt) {
  evt.preventDefault();

  userController.submit(evt.currentTarget);
}

//удаление класса ошибки из полей формы
fields.forEach((field) => field.addEventListener("focus", outError));

function outError(evt) {
  userController.outError(evt.currentTarget);
}
