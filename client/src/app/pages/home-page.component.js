import { WFMComponent, router, http } from "framework";

class HomePageComponent extends WFMComponent {
    constructor(config) {
        super(config);

        this.data = {
            title: "Приветствуем Вас в системе управления доступом",
        };
    }
}

export const homePageComponent = new HomePageComponent({
    selector: "app-home-page",
    template: `
    <div class="home">
        <h2>{{title}}</h2>
        <p>для продолжения работы необходимо авторизоваться в системе</p>
    </div>
    `,
    styles: `
    `,
});
