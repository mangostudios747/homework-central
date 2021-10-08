import Vue from "vue";
import Vuex from "vuex";
import { vuexLocal } from "@/plugins/vuex-persist";
import { vuexfireMutations, firebaseAction } from "vuexfire";
import { db } from "@/plugins/db";
import { settings } from "./settings";
import { theSchedule, colors } from "@/plugins/util";

Vue.use(Vuex);

function getTotalMinutes(d = new Date()) {
  return d.getMinutes() + d.getHours() * 60;
}

export default new Vuex.Store({
  state: {
    dialogs: {
      newAssignment: false,
      editAssignment: false,
    },
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
  },
  actions: {
    promptCreateNewAssignment({ state }, pid) {
      state.dialogs.newAssignment = true; //pid;
    },
    cancelCreateNewAssignment({ state }) {
      state.dialogs.newAssignment = false;
    },
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
    currentPeriod: function (state, getters) {
      const todaySched = getters.getSched(state.time, state.theSchedule)
        .schedule;
      const mins = getTotalMinutes(state.time);
      let period = todaySched.filter(function ({ startDate, endDate }) {
        return (
          mins >= getTotalMinutes(startDate) && mins <= getTotalMinutes(endDate)
        );
      })[0];
      if (!period) {
        period = todaySched.filter(function ({ startDate }, index) {
          return (
            // hasn't started yet
            mins <= getTotalMinutes(startDate) &&
            // is indeed up next
            (index === 0 ||
              mins >= getTotalMinutes(todaySched[index - 1].endDate))
          );
        })[0];
        if (!period) return { invalid: true, color: {} };
      }
      const settings = state.settings.dclasses.filter(function (dclass) {
        return period.name === dclass.hcname;
      })[0];
      const notStarted = state.time < period.startDate;
      const timeRemaining = notStarted
        ? period.startDate - state.time
        : period.endDate - state.time;
      const duration = (period.endDate - period.startDate) / 60000;
      return {
        ...period,
        ...settings,
        notStarted,
        timeRemaining,
        lessThanAMinute: timeRemaining < 60000,
        minutesRemaining: Math.round(timeRemaining / 60000),
        percentToShow:
          100 * (1 - timeRemaining / 60000 / (notStarted ? 10 : duration)),
      };
    },
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
        if (dob > new Date("June 2 2022")) {
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
            const isCurrent = startDate < state.time && state.time < endDate;
            return {
              name,
              startDate,
              endDate,
              isCurrent,
              isUpNext,
              ...prefs,
              color: prefs ? prefs.color : { hex: colors.secondary },
              percentDone: isCurrent
                ? (100 * (state.time - startDate)) / (endDate - startDate)
                : 0,
              endingIn: Math.round((endDate - state.time) / 60000),
            };
          });
        }

        return returnValue;
      },
  },
  plugins: [vuexLocal.plugin],
});
