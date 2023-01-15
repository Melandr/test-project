import { _ } from "framework";
class HTTP {
    get(url) {
        const options = {
            method: "GET",
        };
        return sendRequest(url, options);
    }

    post(url, data) {
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
                _.saveToken(token);
                // return Promise.resolve(token);
            })
            .catch((err) => console.log(err.message));
        // return sendRequest(url, options);
    }
}

function sendRequest(url, options, data = {}) {
    return fetch(url, options).then((response) => response.json());
}

export const http = new HTTP();
