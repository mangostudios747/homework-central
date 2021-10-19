<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(auto-fill, 22rem);
      gap: 10px;
    "
    class="container mt-5"
  >
    <b-card
      text-variant="dark"
      title-tag="h5"
      :title="c.name"
      style=""
      :key="c.phoneNumber"
      v-for="c of lifelines"
    >
      <a :href="'tel:' + c.phoneNumber">{{ c.phoneNumber }}</a>
      <p>{{ c.description }}</p>
    </b-card>
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
