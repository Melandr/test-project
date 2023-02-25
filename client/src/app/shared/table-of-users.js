import { WFMComponent } from "framework";

class TableOfUsers extends WFMComponent {
    constructor(config) {
        super(config);
    }
}

export const tableOfUsers = new TableOfUsers({
    selector: "table-of-users",
    template: `
        <div class="table-users__block">
            <table class="color">
            <tbody>
                <tr>
                    <th>Логин</th>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th>Телефон</th>
                    <th>Email</th>
                </tr>
                <tr>
                    <td>Microsoft</td>
                    <td>20.3</td>
                    <td>30.5</td>
                    <td>23.5</td>
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
                </tr>
                <tr>
                    <td>Apple</td>
                    <td>25.4</td>
                    <td>30.2</td>
                    <td>33.3</td>
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
                </tr>
            </tbody>
        </table>
        </div>            
        <div>
            <a href="#">Перейти на главную</a>             
        </div>
    `,
    styles: `
    `,
});
