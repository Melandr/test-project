import { WFMComponent, ioc } from "framework";
import DataServiceProvider from "../app/services/data.service-provider";

class AppComponent extends WFMComponent {
    constructor(config) {
        super(config);
    }
}

export const appComponent = new AppComponent({
    selector: "app-root",
    template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    `,
    ioc: ioc,
});
