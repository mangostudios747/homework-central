<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      grid-auto-rows: minmax(100px, auto);
    "
  >
    <div style="" :key="c.phoneNumber" v-for="c of lifelines">
      <h5>{{ c.name }}</h5>
      <a :href="'tel:' + c.phoneNumber">{{ c.phoneNumber }}</a>
      <p>{{ c.description }}</p>
    </div>
  </div>
</template>

<script>
import lifelines from "@/plugins/crisislifelines.json";
export default {
  data: () => ({
    lifelines,
  }),
};
</script>

<style></style>
