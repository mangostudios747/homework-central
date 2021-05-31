import VuexPersistence from "vuex-persist";
export const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "hcSettings",
});
