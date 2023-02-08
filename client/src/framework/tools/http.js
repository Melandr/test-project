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

// function manageErrors(response) {
//     if (!response.ok) {
//         const responseError = {
//             statusText: response.statusText,
//             status: response.status,
//             message: "",
//         };

//         const error = response
//             .json()
//             .then((result) => result.detail)
//             .then((data) => {
//                 responseError.message = data;
//                 console.log(responseError.message);
//             });

//         throw responseError;
//     }
//     return response;
// }

export const http = new HTTP();
