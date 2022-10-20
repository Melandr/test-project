import "./styles.css";
import MD5 from "crypto-js/md5";
import { isValid } from "./utils";

const form = document.querySelector("#form");
const inputLogin = form.querySelector("#login-input");
const inputPassword = form.querySelector("#password-input");
const submitBtn = form.querySelector("#submit");

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
  console.log(json);

  return json;
}

function toggleLoader() {
  const loader = document.getElementById("loader");
  loader.classList.toggle("hidden");
}

function onSuccess(formNode, message) {
  alert(message.token);
  formNode.classList.toggle("hidden");
}

function onError(message) {
  alert(message.token);
}

async function sendData(data) {
  const url = "http://localhost:8080/server-app/client/auth";
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

form.addEventListener("input", checkValidity);

async function handleFormSubmit(event) {
  event.preventDefault();
  const data = serializeForm(event.target);

  toggleLoader();
  const response = await sendData(data);
  toggleLoader();

  if (response.ok) {
    const token = await response.json();

    onSuccess(event.target, token);
  } else {
    const error = await response.json();
    onError(error);
  }
}
