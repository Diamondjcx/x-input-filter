import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

import xInputFilter from "../lib";
const _xInputFilter = new xInputFilter();
app.directive(_xInputFilter.name, _xInputFilter.directive());
app.mount("#app");
