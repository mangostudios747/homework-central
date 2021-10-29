<template>
  <div>
    <h5>Barcode</h5>
    <b-col>
      <vue-barcode
        format="CODE39"
        class="mx-auto d-flex"
        width="3"
        :value="idNumber || '95044523'"
      ></vue-barcode>
      <b-form-input
        class="d-block mt-1 text-center"
        trim
        v-model="idNumber"
      ></b-form-input>
    </b-col>
  </div>
</template>

<script>
import VueBarcode from "vue-barcode";
export default {
  data: () => ({
    idNumber: "95000000",
  }),
  components: {
    VueBarcode,
  },
  mounted() {
    this.idNumber = this.$store.state.settings.idNumber || "95000000";
  },
  watch: {
    async idNumber(val) {
      // set the idNumber in settings to this value
      this.$store.commit("settings/setIdNumber", val);
    },
  },
};
</script>

<style></style>
