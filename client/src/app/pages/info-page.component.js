import { WFMComponent, ioc, router, http } from "framework";
import DataServiceProvider from "../services/data.service-provider";
import { DataService } from "../services/data.service";

class InfoPageComponent extends WFMComponent {
    constructor(config) {
        super(config);

        this.data = {
            title: "Информация о пользователе",
            message: "",
            error: {},
        };

        this.service = {};
    }

    onInit() {
        super.onInit();
        this.service = this.ioc.use(DataService);

        this.data.message = this.service.getMessage();
        this.data.error = this.service.getError();
        console.log(this.data);
    }
}

export const infoPageComponent = new InfoPageComponent({
    selector: "app-info-page",
    template: `
    <div class="info">
        <h2>{{title}}</h2>
        <p>{{message}}</p>
    </div>
    `,
    styles: `
    `,
    providers: [DataServiceProvider],
    ioc: ioc,
});