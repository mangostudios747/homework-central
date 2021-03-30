<template>
  <b-container>
    <div class="topnav sticky-top bg-light pt-3" style="opacity: 0.8">
      <h1 class="text-center" v-cloak>
        {{ $store.state.time | moment("h:mm:ss a") }}
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
          data-provide="datepicker"
        /><label
          style="cursor: pointer"
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
    <sched-list />
  </b-container>
</template>

<script>
import SchedList from "@/components/schedList";
export default {
  name: "Schedule",
  components: { SchedList },
};
</script>

<style scoped></style>
