import { WFMComponent } from "framework";

class LoginPageComponent extends WFMComponent {
    constructor(config) {
        super(config);
    }
}

export const loginPageComponent = new LoginPageComponent({
    selector: "app-login-page",
    template: `
    <div class="row">
        <div class="col s6 offset-s3 dir__block">
            <h2>Наведи на меня</h2>
        </div>
    </div>
    `,
    styles: `
        .dir__block { margin-top: 30px;}
    `,
});
