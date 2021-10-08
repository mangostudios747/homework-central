<template>
  <b-container style="padding-bottom: 5rem" class="pt-3">
    <h5>Barcode</h5>
    <b-col>
      <vue-barcode
        format="CODE39"
        class="mx-auto d-flex"
        width="3"
        :value="idNumber"
      ></vue-barcode>
      <b-form-input
        class="d-block mt-1 text-center"
        trim
        v-model="idNumber"
      ></b-form-input>
    </b-col>
  </b-container>
</template>

<script>
import VueBarcode from "vue-barcode";
export default {
  name: "Utilities",
  data: () => ({
    idNumber: "95000000",
  }),
  components: {
    VueBarcode,
  },
};
</script>

<style>
.vue-barcode-element {
  margin-left: auto;
  margin-right: auto;
}
</style>
