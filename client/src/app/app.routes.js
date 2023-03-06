import { homePageComponent } from "./pages/home-page.component";
import { loginPageComponent } from "./pages/login-page.component";
import { infoPageComponent } from "./pages/info-page.component";
import { errorPageComponent } from "./pages/error-page.component";
import { tablePageComponent } from "./pages/table-page.component";

import { notFound } from "./shared/not-found.component";

export const appRoutes = [
    { path: "/", component: homePageComponent },
    { path: "/login", component: loginPageComponent },
    { path: "/info", component: infoPageComponent },
    { path: "/error", component: errorPageComponent },
    { path: "/table", component: tablePageComponent },
    // { path: "/register", component: registerPageComponent },
    { path: "**", component: notFound },
];
