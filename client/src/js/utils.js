//функция форматирования текущей даты и времени
function formatDate() {
  let now = new Date();

  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(
    now.getMinutes()
  )}${pad(now.getSeconds())}`;
}

//функция создания строки сигнатуры с учетом даты, времени, адреса запроса и токена
function createSign() {
  const strResponse = `[${baseUrl}${detailUrl}][tmst=${formatDate()},token=${token}][]`;
  return HmacSHA256(strResponse, secretKey).toString();
}

//Функция для сохранения токена в sessionStorage
function saveToken(token) {
  sessionStorage.setItem("token", JSON.stringify(token));
}

//Функция чтения токена из sessionStorage
function getToken() {
  return sessionStorage.getItem("token");
}

//функция сборки заголовков
function buildHeaders(authorization = null) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: authorization ? authorization : "Bearer TOKEN_MISSING",
  };
  return headers;
}

export { formatDate, createSign, saveToken, getToken, buildHeaders };
