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
    addAssignment: function (state, { hcname, asg, completed }) {
      console.log(hcname);
      state.dclasses
        .find((e) => e.hcname === hcname)
        [completed ? "completed" : "assignments"].push(asg);
    },
    deleteAssignment: function (state, { idx, hcname, completed }) {
      const arr = state.dclasses.find((e) => e.hcname === hcname)[
        completed ? "completed" : "assignments"
      ];
      arr.splice(idx, 1);
      return true;
    },
  },
  getters: {
    classByHCName: (state) => (hcname) => {
      return state.dclasses.find((c) => c.hcname === hcname) || {};
    },
  },
  //plugins: [vuexLocal.plugin],
};
