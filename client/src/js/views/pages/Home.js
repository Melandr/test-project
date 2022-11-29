import NavBar from "../components/NavBar.js";

export default () => {
    return `
    ${NavBar()}
    <div class="home">
        <h2>Приветствуем Вас в системе управления доступом</h2>
        <p>для продолжения работы необходимо авторизоваться в системе</p>
    </div>
    `;
};
