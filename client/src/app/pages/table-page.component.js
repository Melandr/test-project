import { WFMComponent, ioc, router, $, _, http, jwt } from "framework";
import { secret_key, api_url, base_url, users_url } from "../config.js";

class TablePageComponent extends WFMComponent {
    constructor(config) {
        super(config);
    }

    events() {
        return {
            "click .js-link": "goToHome",
        };
    }

    goToHome(event) {
        event.preventDefault();
        router.setRoute("/");
    }

    onInit() {
        super.onInit();

        console.log(this);
        // const table = $(this.selector);
        // const table = this.find(".table-users__block");
        // console.log(table);

        this.getUsers().then((data) => console.log(data.users.length));
    }

    afterInit() {
        // const table = this.el.find("#table-users").nativeElement;
        const table = this.el.find(".table-users__block");
        console.log(table);
        // let newRow = table.deleteRow(1);
        // console.log(table.rows);
        // this.render();
    }

    getUsers() {
        const url = base_url + users_url;

        const headers = new Headers();
        headers.append("tmst", jwt._formatDate());
        headers.append("token", _.getToken());
        headers.append("sign", jwt.createSign(api_url + users_url, _.getToken(), secret_key));

        const result = http
            .get(url, headers)
            .then((response) => response.json())
            .then((data) => {
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });

        return result;
    }
}

export const tablePageComponent = new TablePageComponent({
    selector: "table-of-users",
    template: `
    <div class="table-users__block">

    </div>            
        <div class="link__block">
            <a href="#not-existing-path" class="js-link nav__link">Перейти на главную</a>  
        </div>
    `,
    styles: `
        #table-users {display: flex; justify-content: center; margin-top: 30px; color: black;}
    `,
});
