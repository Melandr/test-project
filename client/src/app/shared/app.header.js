import { WFMComponent } from "framework";

class AppHeader extends WFMComponent {
    constructor(config) {
        super(config);
    }
}

export const appHeader = new AppHeader({
    selector: "app-header",
    template: `
    <header class="header">
        <div class="nav-container">
            <nav class="nav">
                <div class="nav__list">
                    <a href="/" class="navbar__item">Home</a>
                    <a href="/about" class="navbar__item">About</a>
                    <a href="/news" class="navbar__item">News</a>
                </div>

                <div class="nav__auth">
                    <ul class="navbar__auth">
                        <li class="nav__item">
                            <a href="/login" class="nav__link" aria-current="page">Авторизация</a>
                        </li>
                        <li class="nav__item">
                            <a href="/register" class="nav__link">Регистрация</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div> 
    </header>   
    `,
    styles: `
    `,
});
