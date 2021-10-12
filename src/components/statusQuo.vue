<template>
  <div
    v-if="
      $store.state.focusedDate.toDateString() ===
        $store.state.time.toDateString() && !currentPeriod.invalid
    "
  >
    <div class="mx-1 my-2">
      <b-badge
        variant="none"
        :style="{
          backgroundColor: currentPeriod.color.hex || currentPeriod.color,
        }"
        :class="
          isLight(currentPeriod.color.hex || currentPeriod.color)
            ? 'text-dark ignore-theme'
            : 'text-light ignore-theme'
        "
        >{{ currentPeriod.name }}</b-badge
      >
      {{ currentPeriod.notStarted ? "starting" : "ending" }} in
      {{ currentPeriod.minutesRemaining }} minutes.
    </div>
    <b-progress
      :max="100"
      height="7px"
      style="background-color: rgba(0, 0, 0, 0.2)"
      class="mb-3"
      variant="none"
    >
      <b-progress-bar
        variant="none"
        :value="currentPeriod.percentToShow"
        :style="{
          backgroundColor: currentPeriod.color.hex || currentPeriod.color,
        }"
      >
      </b-progress-bar>
    </b-progress>
  </div>
</template>

<script>
// tells what period is on rn
import { mapGetters } from "vuex";
import { isLight } from "@/plugins/util";

export default {
  name: "statusQuo",
  methods: { isLight },
  computed: {
    ...mapGetters(["currentPeriod"]),
  },
};
</script>

<style scoped></style>
