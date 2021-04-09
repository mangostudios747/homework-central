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

new Vue({
  router,
  store,
  mounted() {
    store.dispatch("bindSchedule");
    setInterval(function () {
      const time = new Date();
      if (store.state.time == store.state.focusedDate)
        store.state.focusedDate = time;
      store.state.time = time;
    }, 100);
  },
  render: (h) => h(App),
}).$mount("#app");
