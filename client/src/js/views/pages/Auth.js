import NavBar from "../components/NavBar.js";
import AuthForm from "../components/AuthForm.js";

export default () => {
    return `
    ${NavBar()}
    ${AuthForm()}
    `;
};
