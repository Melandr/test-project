import "../css/styles.css";
//модули
import { UserController } from "./js/controllers/UserController";
import { UserService } from "./js/services/UserService";
import { UserModel } from "./js/models/UserModel";
import { UserView } from "./js/views/UserView";
import Router, { render } from "./js/services/Router";

//страницы
import Home from "./js/views/pages/Home.js";
import NotFound from "./js/views/pages/NotFound.js";
import About from "./js/views/pages/About.js";
import Services from "./js/views/pages/Services.js";
import Contacts from "./js/views/pages/Contacts.js";
import Auth from "./js/views/pages/Auth.js";
import News from "./js/views/pages/News";

//обработчик при открытии страницы
document.addEventListener("DOMContentLoaded", ready);

function ready() {
    //устанавливаем маршруты для Router
    const routes = {
        "/": Home,
        "/login": Auth,
        // "/register": Register,
        "/about": About,
        "/services": Services,
        "/contacts": Contacts,
        "/news": News,
    };

    const app = document.querySelector(".app");

    Router.init(app, routes, NotFound);

    render(new URL(window.location.href).pathname);

    window.addEventListener("popstate", (e) => {
        render(new URL(window.location.href).pathname);
    });

    //Удаляем токен из sessionStorage
    if (sessionStorage.getItem("token")) {
        sessionStorage.removeItem("token");
    }

    //DOM
    // const form = document.querySelector("#form");
    // const fields = form.querySelectorAll("[name]");

    //экземпляры модулей
    const userModel = new UserModel();
    const userService = new UserService();
    const userView = new UserView(app);
    const userController = new UserController(userView, userService, userModel);

    //обработчик отправки формы
    // form.addEventListener("submit", submitForm);

    function submitForm(evt) {
        evt.preventDefault();

        userController.submit(evt.currentTarget);
    }

    //удаление класса ошибки из полей формы
    // fields.forEach((field) => field.addEventListener("focus", clearError));

    function clearError(evt) {
        userController.clearError(evt.currentTarget);
    }
}
