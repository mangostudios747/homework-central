import Vue from "vue";
import Vuex from "vuex";
import { vuexLocal } from "@/plugins/vuex-persist";
import { vuexfireMutations, firebaseAction } from "vuexfire";
import { db } from "@/plugins/db";
import { settings } from "./settings";
import { theSchedule, colors } from "@/plugins/util";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theSchedule,
    colors,
    time: new Date(),
    focusedDate: new Date(), //("June 2 2021"),
  },
  mutations: {
    ...vuexfireMutations,
    setFocusedDate: function (state, date) {
      state.focusedDate = date;
    },
    setOptions: function (state, options) {
      state.settings = options;
      state.settings.lastUpdated = options;
      console.warn("pls dont use me");
    },
  },
  actions: {
    bindSchedule: firebaseAction(({ bindFirebaseRef }) => {
      return bindFirebaseRef("theSchedule", db.ref("schedule"));
    }),
    nextDay: function ({ state, commit }) {
      const date = state.focusedDate.addDays(1);
      commit("setFocusedDate", date);
    },
    previousDay: function ({ state, commit }) {
      const date = state.focusedDate.addDays(-1);
      commit("setFocusedDate", date);
    },
  },
  modules: {
    settings,
  },
  getters: {
    hours: function (state) {
      return state.time.getHours();
    },
    minutes: function (state) {
      return state.time.getMinutes();
    },
    seconds: function (state) {
      return state.time.getSeconds();
    },
    getFocusedSched: function (state, getters) {
      return getters.getSched(state.focusedDate, state.theSchedule);
    },
    getCurrPeriod() {},
    getSched: (state) =>
      function (dob, sched, mainView = true) {
        dob = new Date(dob);
        const returnValue = {};
        if (sched.overrides == undefined || sched.holidays == undefined) {
          if (mainView) {
            returnValue.holidayReason = null;
          }
          returnValue.schedule = [];
        }
        const ref =
          dob.getMonth() + "-" + dob.getDate() + "-" + dob.getFullYear();
        if (dob > new Date("June 4 2021")) {
          if (mainView) {
            returnValue.holidayReason = "Summer Vacation";
          }
          returnValue.schedule = [];
        } else if (ref in sched.overrides) {
          //console.log("overridden");

          returnValue.schedule = sched.overrides[ref];
        } else if (ref in sched.holidays) {
          if (mainView) {
            returnValue.holidayReason = sched.holidays[ref];
          }
          returnValue.schedule = []; //empty schedule, and set the holiday reason to what it is
        } else {
          //console.log("default");
          if (mainView) returnValue.holidayReason = null;
          returnValue.schedule = sched.defaults[dob.getDay()]; //regular schedule for this day of the week
        }

        if (returnValue.schedule) {
          returnValue.schedule = returnValue.schedule.map(function (
            { name, start, end },
            index,
            array
          ) {
            const startDate = new Date(dob);
            startDate.setHours(start[0]);
            startDate.setMinutes(start[1]);
            startDate.clearSeconds();
            const endDate = new Date(dob);
            endDate.setHours(end[0]);
            endDate.setMinutes(end[1]);
            endDate.clearSeconds();
            let isUpNext = false;
            if (index === 0) {
              // this is the first period
              if (dob < startDate) isUpNext = true;
            } else {
              const previous = array[index - 1];
              const prevEnd = new Date(dob);
              prevEnd.setHours(previous.end[0]);
              prevEnd.setMinutes(previous.end[1]);
              prevEnd.clearSeconds();
              if (dob > prevEnd && dob < startDate) isUpNext = true;
            }
            const prefs = state.settings.dclasses.filter(
              ({ hcname }) => hcname === name
            )[0];
            return {
              name,
              startDate,
              endDate,
              isCurrent: startDate < dob && dob < endDate,
              isUpNext,
              ...prefs,
              color: prefs ? prefs.color : "dark",
            };
          });
        }

        return returnValue;
      },
  },
  plugins: [vuexLocal.plugin],
});
