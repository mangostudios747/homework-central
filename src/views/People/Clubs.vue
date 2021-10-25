<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import clubs from "@/plugins/clubs.json";
export default {
  data: () => ({
    clubs,
  }),
};
</script>

<style></style>
