import "./css/styles.css";
// import MD5 from "crypto-js/md5";
import { HmacSHA256, SHA256, MD5 } from "crypto-js";

const form = document.querySelector("#form");
const wrapper = document.querySelector(".wrapper");
const divInfo = document.querySelector(".detail-info");
const divDate = document.querySelector(".date");
const inputLogin = form.querySelector("#login-input");
const inputPassword = form.querySelector("#password-input");
const submitBtn = form.querySelector("#submit");

let user = {};
const secretKey = "ILoveMyProject";
let token = "";
const baseUrl = "http://localhost:8080/server-app/client";
const authUrl = "/auth";
const detailUrl = "/detail";
const logoutUrl = "/logout";

form.addEventListener("submit", handleFormSubmit);

function serializeForm(formNode) {
  const { elements } = formNode;

  const data = new FormData();

  Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, value } = element;

      data.append(name, value);
    });

  // console.log(Array.from(data.entries()));

  let object = {};
  data.forEach((value, key) => (object[key] = key === "password" ? MD5(value).toString() : value));
  let json = JSON.stringify(object);

  return json;
}

function toggleLoader() {
  const loader = document.getElementById("loader");
  loader.classList.toggle("hidden");
}

function onSuccess(formNode, message) {
  formNode.classList.toggle("hidden");
}

function onError(message) {
  alert(message.token);
}

//функция запроса на авторизацию
async function sendData(data) {
  const url = baseUrl + authUrl;
  return await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  });
}

function checkValidity(event) {
  const formNode = event.target.form;
  const isValid = formNode.checkValidity();

  formNode.querySelector("button").disabled = !isValid;
}

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
function createSign() {
  const strResponse = `[${baseUrl}${detailUrl}][tmst=${formatDate()},token=${token}][]`;
  return HmacSHA256(strResponse, secretKey).toString();
}

//функция запроса детальных данных пользователя
async function getUserDetailInfo() {
  const url = baseUrl + detailUrl;
  const options = {
    method: "GET",
    // mode: "no-cors",
    headers: { tmst: formatDate(), token: token, sign: createSign() },
  };
  return await fetch(url, options);
}

//обработчик ввода данных пароля
form.addEventListener("input", checkValidity);

async function handleFormSubmit(event) {
  event.preventDefault();
  const data = serializeForm(event.target);

  // toggleLoader();
  const response = await sendData(data);
  // toggleLoader();

  if (response.ok) {
    const request = await response.json();

    token = request.token;
    // Сохраняем данные в sessionStorage
    sessionStorage.setItem("token", request.token);

    //Создаем новый запрос
    const responseUserInfo = await getUserDetailInfo();
    user = await responseUserInfo.json();
    console.log(user);

    onSuccess(event.target, request);
  } else {
    const error = await response.json();
    onError(error);
  }
}
