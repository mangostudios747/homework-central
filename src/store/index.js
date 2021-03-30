import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firebaseAction } from "vuexfire";
import { db } from "@/plugins/db";
import { theSchedule, dclasses } from "@/plugins/util";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theSchedule,
    settings: {
      theme: "light",
      style: "default",
      catime: false, // CA Time - whether all times should be forced into california format. Off by default.
      timeMode: 12,
      classes: [],
      dclasses,
    },
    time: new Date(),
    focusedDate: new Date(),
  },
  mutations: {
    ...vuexfireMutations,
  },
  actions: {
    bindSchedule: firebaseAction(({ bindFirebaseRef }) => {
      return bindFirebaseRef("theSchedule", db.ref("theSchedule"));
    }),
  },
  modules: {},
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

    getSched: () =>
      function (dob, sched, mainView = true) {
        const returnValue = {};
        if (sched.overrides == undefined || sched.holidays == undefined) {
          if (mainView) {
            returnValue.holidayReason = null;
          }
          returnValue.schedule = [];
        }
        if (dob > new Date("June 3 2021")) {
          returnValue.holidayReason = "Summer Vacation";
          returnValue.schedule = [];
        }
        const ref =
          dob.getMonth() + "-" + dob.getDate() + "-" + dob.getFullYear();
        if (ref in sched.overrides) {
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
          returnValue.schedule = returnValue.schedule.map(function ({
            name,
            start,
            end,
          }) {
            const startDate = new Date(dob);
            startDate.setHours(start[0]);
            startDate.setMinutes(start[1]);
            const endDate = new Date(dob);
            endDate.setHours(end[0]);
            endDate.setMinutes(end[1]);
            return {
              name,
              start,
              end,
              startDate,
              endDate,
            };
          });
        }

        return returnValue;
      },
  },
});
