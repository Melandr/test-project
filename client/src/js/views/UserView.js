export class UserView {
  constructor(container) {
    this.container = container;
  }

  // renderSucess() {
  //   this.container.innerHTML = "Вы успешно авторизованы.";
  // }

  renderSucess(userName) {
    this.container.innerHTML = `${userName},<br>Вы успешно авторизованы.`;
  }

  renderFailure(err) {
    this.container.innerHTML = `Произошла ошибка. <br> ${err}`;
  }

  renderError(msg, attribute) {
    const element = this.container.querySelector(`[name="${attribute}"]`);
    const spanError = this.container.querySelector(`#error-${attribute}`);

    spanError.textContent = msg;

    spanError.classList.add("active");

    element.classList.add("error");
    element.classList.add("active");

    element.blur();
  }

  clearError(domObject) {
    const spanError = this.container.querySelector(`#error-${domObject.getAttribute("name")}`);

    spanError.textContent = "";
    spanError.classList.remove("active");

    domObject.classList.remove("error");
    domObject.classList.remove("active");
  }
}
