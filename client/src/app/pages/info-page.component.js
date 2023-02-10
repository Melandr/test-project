import { WFMComponent, ioc, router, http } from "framework";
import { ExampleService } from "../app.example.service";

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
});

// const appTitle = ioc.use("APP_TITLE");
// console.log(appTitle);
// console.log(ioc.use("APP_TITLE"));
console.log(ioc);
