<template>
  <b-list-group-item
    :style="{
      backgroundColor: chroma(item.color).brighten(2).desaturate().hex(),
    }"
    class="d-flex"
  >
    <b-form-checkbox class="text-pink" />
    <span :style="{ color: chroma(item.color).darken(2).hex() }">{{
      item.name
    }}</span>
    <span
      :style="{ color: chroma(item.color).desaturate(2).darken().hex() }"
      class="ml-1"
      >{{ item.dueDate | moment("from", "now") }}</span
    >
  </b-list-group-item>
</template>

<script>
import chroma from "chroma-js";

export default {
  name: "TodoItem",
  data: () => ({
    chroma,
  }),
  props: {
    item: {
      type: Object,
      default: () => ({
        name: "Vestibulum at eros",
        dueDate: new Date("July 21 2021 4:00 PM"),
        color: "#17850e",
      }),
    },
  },
};
</script>

<style scoped></style>
