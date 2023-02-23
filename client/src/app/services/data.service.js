export class DataService {
    message = "";
    error = {};

    getMessage() {
        return this.message;
    }

    setMessage(value) {
        this.message = value;
    }

    getError() {
        return this.error;
    }

    setError(value) {
        this.error = value;
    }
}
