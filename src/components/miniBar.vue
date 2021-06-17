<template>
  <div
    class="container justify-content-center mx-auto row pb-1 mt-1"
    style="
      padding-left: 1em;
      padding-right: 1em;
      margin-left: auto;
      margin-right: auto;
    "
  >
    <div
      v-b-tooltip.hover.top="
        [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ][int]
      "
      @click="
        $store.commit(
          'setFocusedDate',
          focusedDate.addDays(int - focusedDate.getDay())
        )
      "
      v-for="int in [0, 1, 2, 3, 4, 5, 6]"
      :key="int"
      class="col text-center py-1 pb-2 mini-block"
      tabindex="0"
      :class="
        (int === focusedDate.getDay() ? 'active' : '') +
        (int === time.getDay() &&
        focusedDate.addDays(int - focusedDate.getDay()).getDate() ===
          time.getDate()
          ? ' today'
          : '')
      "
      style="
        max-width: 80px !important;
        margin-left: 0.13rem;
        margin-right: 0.13rem;
        cursor: pointer;
      "
    >
      <!-- clicking should take one to the thing -->
      <div class="row text-center">
        <span class="text-center mx-auto">{{
          ["S", "M", "T", "W", "H", "F", "S"][int]
        }}</span>
      </div>
      <div style="">
        <div
          v-for="p in $store.getters.getSched(
            focusedDate.addDays(int - focusedDate.getDay()),
            $store.state.theSchedule,
            false
          ).schedule"
          :key="p.name"
          style="
            margin-top: 0.1rem;
            margin-bottom: 0.1rem;
            margin-left: -0.5em;
            margin-right: -0.5em;
          "
          class="row card card-body p-1 text-center"
          :style="{
            backgroundColor:
              p.color.hex ||
              p.color ||
              $store.state.settings.colors[p.hcname] ||
              $store.state.settings.colors['Other'],
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "miniBar",
  props: ["schedule", "focusedDate", "time"],
};
</script>

<style scoped></style>
