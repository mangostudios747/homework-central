import { dclasses, colors } from "@/plugins/util";

export const settings = {
  namespaced: true,
  state: () => ({
    lastUpdated: null,
    theme: "light",
    style: "default",
    colors: {
      "Period 1": colors.danger,
      "Period 2": colors.orange,
      "Period 3": colors.warning,
      "Period 4": colors.success,
      "Period 5": colors.info,
      "Period 6": colors.blue,
      "Period 7": colors.indigo,
      Other: colors.secondary,
    },
    catime: false, // CA Time - whether all times should be forced into california format. Off by default.
    timeMode: 12,
    classes: [],
    dclasses, // default class mappings
  }),
  mutations: {
    setOptions: function (state, options) {
      Object.assign(state, options);
    },
  },
  //plugins: [vuexLocal.plugin],
};
