<template>
  <div class="container mt-5">
    <h5 class="mb-3">Crisis Hotlines</h5>
    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fill, 18rem);
        gap: 10px;
        justify-content: center;
      "
    >
      <b-card
        text-variant="dark"
        title-tag="h6"
        :title="c.name"
        style=""
        :key="c.phoneNumber"
        v-for="c of lifelines"
      >
        <a :href="'tel:' + c.phoneNumber">{{ c.phoneNumber }}</a>
        <p>{{ c.description }}</p>
      </b-card>
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
