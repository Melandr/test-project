import { MD5, HmacSHA256 } from "crypto-js";

class JWToken {
    constructor() {}

    //функция форматирования текущей даты и времени
    _formatDate() {
        let now = new Date();

        function pad(n) {
            return n < 10 ? "0" + n : n;
        }

        return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(
            now.getMinutes()
        )}${pad(now.getSeconds())}`;
    }

    hashPassword(pass) {
        return MD5(pass).toString();
    }

    //функция создания строки сигнатуры с учетом даты, времени, адреса запроса и токена
    createSign(url, token, secretKey) {
        const strResponse = `[${url}][tmst=${this._formatDate()},token=${token}][]`;
        return HmacSHA256(strResponse, secretKey).toString();
    }
}

export const jwt = new JWToken();
