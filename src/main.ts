import { createApp } from "vue";
import App from "./App.vue";
import "~/styles/index.scss";
import "uno.css";
// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";
import router from "@/router";
const app = createApp(App);
app.use(router).mount("#app");
