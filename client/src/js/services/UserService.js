import { secret_key, api_url, auth_url, detail_url, proxy_url } from "../config.js";
import { createSign, formatDate, saveToken, getToken } from "../utils.js";

export class UserService {
    // constructor() {
    // this.getUserDetailInfo = this.getUserDetailInfo.bind(this);
    // }
    //Функция для получения токена
    getTokenData(data, failure) {
        const url = proxy_url + auth_url;

        const options = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        };

        return fetch(url, options)
            .then((response) => {
                if (response.status === 200) {
                    return response.json().then((data) => data.token);
                }
                return response.json().then((data) => {
                    throw new Error(data.detail);
                });
            })
            .then((token) => {
                saveToken(token);
                // return Promise.resolve(token);
            })
            .catch((err) => failure(err.message));
    }

    //Функция получения детальной информации о пользователе
    getUserDetailInfo(sucess) {
        const url = proxy_url + detail_url;
        const token = getToken();

        const options = {
            method: "GET",
            headers: {
                tmst: formatDate(),
                token: token,
                sign: createSign(api_url + detail_url, token, secret_key),
            },
        };

        return fetch(url, options).then((response) => {
            if (response.status === 200) {
                return response.json().then((request) => {
                    const name = request.name;
                    sucess(name);
                });
            }
        });
    }
}
