import { WFMComponent, ioc, router, http } from "framework";
import DataServiceProvider from "../services/data.service-provider";

class InfoPageComponent extends WFMComponent {
    constructor(config) {
        super(config);

        this.data = {
            title: "Информация о пользователе",
        };
    }
}

export const infoPageComponent = new InfoPageComponent({
    selector: "app-info-page",
    template: `
    <div class="info">
        <h2>{{title}}</h2>
    </div>
    `,
    styles: `
    `,
    providers: [DataServiceProvider],
});
