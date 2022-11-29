export default () => `
    <div class="form-container">
        <form class="form" id="form">
            <div class="title">Авторизация</div>
            <div class="input-container ic1">
                <input id="login-input" name="login" class="input" type="text" placeholder=" " />
                <div class="cut"></div>
                <label for="login-input" class="placeholder">Логин</label>
            </div>
            <span class="error" id="error-login">пожалуйста, введите логин</span>
            <div class="input-container ic2">
                <input id="password-input" name="password" class="input" type="password" placeholder=" " />
                <div class="cut"></div>
                <label for="password-input" class="placeholder">Пароль</label>
            </div>
            <span class="error" id="error-password">пожалуйста, введите пароль</span>
            <button type="text" class="submit" id="submit">Отправить</button>
            <div id="loader" class="hidden">Отправляем...</div>
        </form>
    </div>    
`;
