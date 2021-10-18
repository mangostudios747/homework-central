<template>
  <b-container style="padding-bottom: 5rem" class="pt-3">
    <Barcode />
    <Lifelines />
    <!-- crisis lifelines --->
  </b-container>
</template>

<script>
import Barcode from "@/components/Barcode.vue";
import Lifelines from "@/components/Lifelines.vue";
export default {
  name: "Utilities",
  data: () => ({}),
  components: {
    Barcode,
    Lifelines,
  },
};
</script>

<style>
.vue-barcode-element {
  margin-left: auto;
  margin-right: auto;
}
</style>
