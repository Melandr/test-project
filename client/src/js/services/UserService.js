import { secret_key, api_url, auth_url } from "../config.js";
import { HmacSHA256, SHA256, MD5 } from "crypto-js";

export class UserService {
  constructor() {}

  validation(value, typeDomObject, minlength) {
    if (!value) throw new Error(`Пожалуйста, заполните поле ${typeDomObject}`);

    if (value.length <= parseInt(minlength))
      throw new Error(`Пожалуйста, заполните поле ${typeDomObject} должно быть более ${minlength} символов`);

    if (!isNaN(value)) throw new Error(`Пожалуйста, заполните поле ${typeDomObject} válido`);
  }

  async performGetHttpRequest(fetchLink, headers, query = null) {
    if (!fetchLink || !headers) {
      throw new Error("One or more GET request parameters was not passed.");
    }
    try {
      const rawResponse = await fetch(fetchLink, {
        method: "GET",
        headers: headers,
        query: query != null ? query : "",
      });
      const content = await rawResponse.json();
      return content;
    } catch (err) {
      console.error(`Error at fetch GET: ${err}`);
      throw err;
    }
  }

  async performPostHttpRequest(fetchLink, headers, body) {
    if (!fetchLink || !headers || !body) {
      throw new Error("One or more POST request parameters was not passed.");
    }
    try {
      const rawResponse = await fetch(fetchLink, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      const content = await rawResponse.json();
      return content;
    } catch (err) {
      console.error(`Error at fetch POST: ${err}`);
      throw err;
    }
  }

  async performPutHttpRequest(fetchLink, headers, body) {
    if (!fetchLink || !headers || !body) {
      throw new Error("One or more POST request parameters was not passed.");
    }
    try {
      const rawResponse = await fetch(fetchLink, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body),
      });
      const content = await rawResponse.json();
      return content;
    } catch (err) {
      console.error(`Error at fetch PUT: ${err}`);
      throw err;
    }
  }

  sendFormData(data, sucess, failure) {}
}
