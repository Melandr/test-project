import { WFMProvider } from "framework";

class DataService extends WFMProvider {
    message = 1;

    getMessage() {
        return this.message;
    }

    setMessage(value) {
        this.message = value;
    }
}

export default new DataService();
