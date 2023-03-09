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

        // const table = $(this.selector);
        // const table = this.el.find("#table-users");
        this.getUsers().then((data) => console.log(data.users.length));
    }

    afterInit() {
        const table = this.el.find("#table-users").nativeElement;
        console.log(table.rows);
        let newRow = table.deleteRow(1);
        console.log(table.rows);
        this.render();
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
        <table class="users" id="table-users">
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Логин</th>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th>Телефон</th>
                    <th>Email</th>
                    <th>Фото</th>
                </tr>
                <tr>
                    <td>Microsoft</td>
                    <td>20.3</td>
                    <td>30.5</td>
                    <td>23.5</td>
                    <td>40.3</td>
                    <td>40.3</td>
                    <td>40.3</td>
                    <td>40.3</td>
                </tr>
                <tr>
                    <td>Google</td>
                    <td>50.2</td>
                    <td>40.63</td>
                    <td>45.23</td>
                    <td>39.3</td>
                    <td>39.3</td>
                    <td>39.3</td>
                    <td>39.3</td>
                </tr>
                <tr>
                    <td>Apple</td>
                    <td>25.4</td>
                    <td>30.2</td>
                    <td>33.3</td>
                    <td>36.7</td>
                    <td>36.7</td>
                    <td>36.7</td>
                    <td>36.7</td>
                </tr>
                <tr>
                    <td>IBM</td>
                    <td>20.4</td>
                    <td>15.6</td>
                    <td>22.3</td>
                    <td>29.3</td>
                    <td>29.3</td>
                    <td>29.3</td>
                    <td>29.3</td>
                </tr>
            </tbody>
        </table>
        <div class="link__block">
            <a href="#not-existing-path" class="js-link nav__link">Перейти на главную</a>  
        </div>
    `,
    styles: `
        #table-users {display: flex; justify-content: center; margin-top: 30px; color: black;}
    `,
});
