import { homePageComponent } from "./pages/home-page.component";
import { loginPageComponent } from "./pages/login-page.component";
import { infoPageComponent } from "./pages/info-page.component";

import { notFound } from "./shared/not-found.component";

export const appRoutes = [
    { path: "/", component: homePageComponent },
    { path: "/login", component: loginPageComponent },
    { path: "/info", component: infoPageComponent },
    // { path: "/register", component: registerPageComponent },
    { path: "**", component: notFound },
];
