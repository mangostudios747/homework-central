<template>
  <b-container style="padding-bottom: 5rem">
    <div
      class="topnav sticky-top pt-3"
      style="background-color: var(--grey1-50); backdrop-filter: blur(10px)"
    >
      <h1 class="text-center" v-cloak>
        {{
          $store.state.time
            | moment(
              `${$store.state.settings.timeMode === 24 ? "H" : "h"}:mm:ss A`
            )
        }}
      </h1>
      <h1 class="text-center">
        <a
          v-b-tooltip.hover.left
          :title="focusedDate.addDays(-1).toDateString()"
          class="btn text-center btn-lg"
          style="cursor: pointer"
          @click="$store.dispatch('previousDay')"
          ><b-icon-chevron-left
        /></a>
        <b-form-datepicker
          no-close-on-select
          nav-button-variant="primary text-light"
          button-variant="none"
          value-as-date
          button-only
          v-model="focusedDate"
        >
          <template #button-content>
            <label
              v-b-tooltip.hover.bottom
              title="Pick date"
              style="cursor: pointer; min-width: 160px"
              v-cloak
              class="text-primary text-center h3"
              >{{ $store.state.focusedDate | moment("ddd, MMM D") }}</label
            >
          </template>
        </b-form-datepicker>
        <a
          v-b-tooltip.hover.right
          :title="focusedDate.addDays(1).toDateString()"
          style="cursor: pointer"
          class="btn text-center btn-lg"
          @click="$store.dispatch('nextDay')"
          ><b-icon-chevron-right
        /></a>
      </h1>
    </div>
    <status-quo />
    <sched-list />
    <h5 class="my-3 font-weight-bold">Events</h5>
    <div :key="idx" v-for="(event, idx) in events">
      <h6>{{ event.summary }}</h6>
      <p class="ml-3" style="white-space: pre-wrap; opacity: 0.5">
        {{ event.description ? event.description.trim() : null }}
      </p>
    </div>
  </b-container>
</template>

<script>
import SchedList from "@/components/schedList";
import StatusQuo from "@/components/statusQuo";
import {
  eventsForDay,
  detectAltSchedFromEvents,
} from "@/plugins/fetchGCalendar";

export default {
  name: "Schedule",
  components: { StatusQuo, SchedList },
  data: () => ({ events: [] }),
  async mounted() {
    this.events = await eventsForDay(this.$store.state.focusedDate);
  },
  watch: {
    async focusedDate() {
      this.events = (await eventsForDay(this.$store.state.focusedDate)).map(
        (e) => {
          if (e.description) e.description = e.description.trim();
          return e;
        }
      );
    },
  },
  computed: {
    /*altScheds(){
      return detectAltSchedFromEvents(this.events, this.focusedDate)
    },*/
    focusedDate: {
      get() {
        return this.$store.state.focusedDate;
      },
      set(val) {
        this.$store.commit("setFocusedDate", val);
      },
    },
  },
};
</script>

<style scoped></style>
