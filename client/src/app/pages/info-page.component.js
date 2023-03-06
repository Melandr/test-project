import { WFMComponent, ioc, router, http } from "framework";
import DataServiceProvider from "../services/data.service-provider";
import { DataService } from "../services/data.service";

class InfoPageComponent extends WFMComponent {
    constructor(config) {
        super(config);

        this.data = {
            title: "Добро пожаловать,",
            name: "",
        };

        this.service = {};
        // this.service = this.ioc.use(DataService);
    }

    events() {
        return {
            "click .btn-get-users": "showTableUsers",
        };
    }

    showTableUsers() {
        router.setRoute("/table");
    }

    onInit() {
        super.onInit();

        this.service = this.ioc.use(DataService);

        this.data.name = this.service.getMessage() ?? "";
    }
}

export const infoPageComponent = new InfoPageComponent({
    selector: "app-info-page",
    template: `
    <div class="info">
        <h2>{{title}}</h2>
        <p>{{name}}</p>
        <div class="btn-container">
            <button type="text" class="btn-get-users">Загрузить список пользователей</button>        
        </div>
    </div>
    `,
    styles: `
    `,
    providers: [DataServiceProvider],
    ioc: ioc,
});
