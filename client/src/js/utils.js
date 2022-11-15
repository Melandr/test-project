import { HmacSHA256 } from "crypto-js";

//функция форматирования текущей даты и времени
function formatDate() {
    let now = new Date();

    function pad(n) {
        return n < 10 ? "0" + n : n;
    }

    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(
        now.getMinutes()
    )}${pad(now.getSeconds())}`;
}

//функция создания строки сигнатуры с учетом даты, времени, адреса запроса и токена
function createSign(url, token, secretKey) {
    const strResponse = `[${url}][tmst=${formatDate()},token=${token}][]`;
    return HmacSHA256(strResponse, secretKey).toString();
}

//Функция для сохранения токена в sessionStorage
function saveToken(token) {
    sessionStorage.setItem("token", token);
}

//Функция чтения токена из sessionStorage
function getToken() {
    return sessionStorage.getItem("token");
}

function validation(value, typeDomObject, minlength) {
    if (!value) {
        throw new Error(`Пожалуйста, заполните поле ${typeDomObject}`);
    }

    if (value.length <= parseInt(minlength) && typeDomObject === "password") {
        throw new Error(`Пожалуйста, заполните поле ${typeDomObject} минимум ${minlength} символов`);
    }
}

export { formatDate, createSign, saveToken, getToken, validation };
