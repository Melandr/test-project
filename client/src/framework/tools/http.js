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
    return fetch(url, options).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok && response.status === 404) {
        return Promise.reject(response);
    }
    if (response.status === 200) {
        return response.json();
    }
}

export const http = new HTTP();
