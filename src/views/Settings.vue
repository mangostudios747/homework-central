<template>
  <b-container style="padding-bottom: 5rem" class="pt-3">
    <announcements-viewer />
    <div v-if="options">
      <div class="my-3">
        <b-form-group label-size="lg" label-class="h4" label="Theme">
          <b-form-radio v-model="options.theme" value="light"
            >Light</b-form-radio
          >
          <b-form-radio v-model="options.theme" value="dark">Dark</b-form-radio>
        </b-form-group>
      </div>
      <div class="my-3">
        <b-form-group label-size="lg" label="Time Formatting">
          <template #label>
            <span class="h5">Time Formatting</span>
          </template>
          <b-form-radio v-model="options.timeMode" :value="12"
            >12-hour</b-form-radio
          >
          <b-form-radio v-model="options.timeMode" :value="24"
            >24-hour</b-form-radio
          >
        </b-form-group>
      </div>
      <div class="my-3">
        <span class="h5">Periods</span>

        <b-row
          class="my-2"
          cols="12"
          align-v="center"
          :key="dclass.hcname"
          v-for="dclass of options.dclasses"
        >
          <b-col cols="2">
            <b-dropdown
              variant="none"
              class="rounded-circle"
              :style="{
                backgroundColor:
                  dclass.color.hex ||
                  $store.state.settings.colors[dclass.hcname] ||
                  $store.state.settings.colors.Other,
                height: '40px',
                width: '40px',
              }"
              no-caret
            >
              <template #button-content>
                <i class="bi bi-eyedropper text-white-50"></i>
              </template>
              <chrome-picker v-model="dclass.color" />
            </b-dropdown>
          </b-col>
          <b-col cols="10">
            <b-form-input :placeholder="dclass.hcname" v-model="dclass.name" />
          </b-col>
        </b-row>
      </div>
    </div>
    <div v-else>Loading . . .</div>
  </b-container>
</template>

<script>
const { Chrome } = require("vue-color");

import AnnouncementsViewer from "@/components/AnnouncementsViewer";
export default {
  name: "Settings",
  components: { AnnouncementsViewer, "chrome-picker": Chrome },
  data: () => ({
    options: null,
  }),
  mounted() {
    this.options = this.$store.state.settings;
  },
  watch: {
    options() {
      if (this.options) {
        this.$store.commit("setOptions", this.options);
      }
    },
  },
};
</script>

<style scoped></style>
