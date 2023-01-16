class HTTP {
    get(url) {
        const options = {
            method: "GET",
        };
        return sendRequest(url, options);
    }

    post(url, body) {
        const options = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
        };

        return sendRequest(url, options);
    }
}

function sendRequest(url, options, data = {}) {
    return fetch(url, options)
        .then((response) => {
            if (response.status === 200) {
                return response.json().then((data) => data.token);
            }
            return response.json().then((data) => {
                throw new Error(data.detail);
            });
        })
        .catch((err) => console.log(err.message));
}

export const http = new HTTP();
