class HTTP {
    get(url) {
        const options = {
            method: "GET",
        };
        return sendRequest(url, options).then(handleResponse);
    }

    post(url, body) {
        const options = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
        };

        return sendRequest(url, options).then(handleResponse);
        // .catch((err) => console.log(err.message));
    }
}

function sendRequest(url, options, data = {}) {
    return fetch(url, options);
}

function handleResponse(response) {
    return response;
}

export const http = new HTTP();
