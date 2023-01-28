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
    return fetch(url, options).then(manageErrors);
}

async function manageErrors(response) {
    if (!response.ok) {
        console.log(response);
        const error = await response.json();

        const responseError = {
            statusText: response.statusText,
            status: response.status,
            message: error.detail,
        };
        throw responseError;
    }
    return response;
}

export const http = new HTTP();
