import "./styles.css";
import { APP_TITLE_TOKEN } from "./app/contracts";
// import "../node_modules/materialize-css/dist/css/materialize.min.css";
// import "materialize-css";

import { bootstrap, _ } from "framework";
import { appModule } from "./app/app.module";
import { ExampleService } from "./app/app.example.service";

bootstrap(appModule);

const ioc = appModule.ioc;

const appTitle = ioc.use(APP_TITLE_TOKEN);
console.log(appTitle);

/**@type {ExampleService} */
const exampleService = ioc.use(ExampleService);
exampleService.run();
console.log("exampleService", exampleService);
