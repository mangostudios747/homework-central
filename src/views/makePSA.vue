<template>
  <b-row>
    <b-col cols="8">
      <b-input v-model="title" placeholder="Title"></b-input>
      <vue-editor v-model="body" />
    </b-col>
    <b-col cols="4">
      <b-textarea
        :value="{ title, body, timestamp: time }"
        rows="10"
      ></b-textarea>
      <b-btn @click="updateTime">update time</b-btn>
    </b-col>
  </b-row>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "makePSA",
  components: { VueEditor },
  data: () => ({
    title: "",
    body: "<p>Welcome, children</p>",
    time: Date.now(),
  }),
  methods: {
    updateTime() {
      this.time = Date.now();
    },
  },
};
</script>

<style scoped></style>
