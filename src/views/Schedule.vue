<template>
  <b-container style="padding-bottom: 5rem">
    <div
      class="topnav sticky-top bg-light pt-3"
      style="opacity: 0.8; backdrop-filter: blur(10px)"
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
          class="btn text-center btn-lg"
          style="cursor: pointer"
          @click="$store.dispatch('previousDay')"
          ><b-icon-chevron-left /></a
        ><input
          id="dp"
          style="height: 0; width: 0; opacity: 0; position: absolute"
          type="date"
        /><label
          style="cursor: pointer; min-width: 160px"
          v-cloak
          for="dp"
          class="text-primary text-center h3"
          >{{ $store.state.focusedDate | moment("ddd, MMM D") }}</label
        ><a
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
      <p style="white-space: pre-wrap; opacity: 0.5">
        {{ event.description ? event.description.trim() : null }}
      </p>
    </div>
  </b-container>
</template>

<script>
import SchedList from "@/components/schedList";
import StatusQuo from "@/components/statusQuo";
import { eventsForDay } from "@/plugins/fetchGCalendar";

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
    focusedDate() {
      return this.$store.state.focusedDate;
    },
  },
};
</script>

<style scoped></style>
