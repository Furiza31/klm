import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import { pinia } from "./plugins/pinia";
import router from "./plugins/router";

createApp(App).use(pinia).use(router).mount("#app");
