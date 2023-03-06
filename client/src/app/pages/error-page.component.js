import { WFMComponent, ioc, router, http } from "framework";
import DataServiceProvider from "../services/data.service-provider";
import { DataService } from "../services/data.service";

class ErrorPageComponent extends WFMComponent {
    constructor(config) {
        super(config);

        this.data = {
            message: "",
        };

        this.service = {};
    }

    onInit() {
        super.onInit();

        this.service = this.ioc.use(DataService);

        this.data.message = this.service.getMessage().message ?? "";
        console.log(this.data.message);
    }
}

export const errorPageComponent = new ErrorPageComponent({
    selector: "app-error-page",
    template: `
    <div class="home">
        <h2>Ошибка</h2>
        <p>{{message}}</p>
    </div>
    `,
    styles: `
    `,
    providers: [DataServiceProvider],
    ioc: ioc,
});
