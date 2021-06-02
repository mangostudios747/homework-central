<template>
  <div>
    <h5>Experiencing problems?</h5>
    <div class="text-center">
      <b-btn @click="reset" variant="warning" class="font-weight-bold"
        >Reset HC</b-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Debug",
  methods: {
    reset() {
      localStorage.clear();
      location.reload();
    },
  },
};
</script>

<style scoped></style>
