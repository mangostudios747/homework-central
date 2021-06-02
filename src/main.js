import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "../public/css/theme.css";
import "../public/css/colors.css";
Vue.config.productionTip = false;
Vue.use(require("vue-moment"));
import { setFavicon } from "@/plugins/favicon";
import { colors } from "@/plugins/util";
new Vue({
  router,
  store,
  mounted() {
    store.dispatch("bindSchedule");
    const faviconElement = document.createElement("LINK");
    faviconElement.rel = "icon";
    faviconElement.type = "image/png";
    faviconElement.href = "/favicon.png";
    document.head.appendChild(faviconElement);
    setInterval(function () {
      // update clock
      {
        const time = new Date(); //("June 2 2021 11:45:15");
        if (store.state.time === store.state.focusedDate)
          store.state.focusedDate = time;
        store.state.time = time;
      }
      // update favicon
      {
        const period = store.getters.currentPeriod;
        setFavicon({
          invalid: period.invalid,
          numToShow: period.minutesRemaining,
          isSeconds: period.lessThanAMinute,
          name: period.name,
          color: period.color.hex || colors[period.color],
          favicon: faviconElement,
        });
      }
    }, 100);
  },
  render: (h) => h(App),
}).$mount("#app");
