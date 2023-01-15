export function validateField(value, typeDomObject, minlength = 3) {
    if (!value) {
        throw new Error(`Пожалуйста, заполните поле ${typeDomObject}`);
    }

    if (value.length <= parseInt(minlength) && typeDomObject === "password") {
        throw new Error(`Пожалуйста, заполните поле ${typeDomObject} минимум ${minlength} символов`);
    }
}
