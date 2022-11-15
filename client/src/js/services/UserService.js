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
                    return response.json().then((request) => {
                        const tokenData = request.token;
                        saveToken(tokenData);
                        console.log(tokenData);
                    });
                }

                if (response.status === 404) {
                    return response
                        .json()
                        .then((request) => {
                            const err = request.detail;
                            failure(err);

                            throw new Error(err);
                        })
                        .catch((err) => {
                            throw err;
                            // return Promise.reject(new Error(error.detail));
                        });
                }
            })
            .catch((err) => {
                throw err;
            });
    }

    //Функция получения детальной информации о пользователе
    getUserDetailInfo(sucess) {
        const url = proxy_url + detail_url;

        const options = {
            method: "GET",
            headers: {
                tmst: formatDate(),
                token: getToken(),
                sign: createSign(api_url + detail_url, getToken(), secret_key),
            },
        };
        console.log(options.headers);
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
