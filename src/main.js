import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VMdEditor from "./markdown";

createApp(App).use(router).use(store).use(VMdEditor).mount("#app");
