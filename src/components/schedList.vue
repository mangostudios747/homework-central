<template>
  <div>
    <div class="text-center" v-if="getFocusedSched.holidayReason">
      <h1
        class="mt-5"
        :class="`text-${
          $store.state.settings.theme === 'dark' ? 'white' : 'black'
        }-50`"
      >
        {{ getFocusedSched.holidayReason }}
      </h1>
    </div>
    <div v-else>
      <course-block
        v-for="(course, idx) of getFocusedSched.schedule"
        :course="course"
        :idx="idx"
        :key="course.name"
      >
      </course-block>
    </div>
    <div
      class="text-center"
      v-if="!getFocusedSched.schedule || !getFocusedSched.schedule.length"
    >
      <h4
        :class="`text-${
          $store.state.settings.theme === 'dark' ? 'white' : 'black'
        }-50`"
      >
        No school today!
      </h4>
    </div>
    <mini-bar
      class="mt-3"
      :focused-date="$store.state.focusedDate"
      :schedule="getFocusedSched.schedule"
      :time="$store.state.time"
    ></mini-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CourseBlock from "@/components/CourseBlock";
import MiniBar from "@/components/miniBar";

export default {
  name: "schedList",
  components: { MiniBar, CourseBlock },
  computed: {
    // eslint-disable-next-line no-undef
    ...mapGetters(["getFocusedSched"]),
  },
};
</script>

<style scoped></style>
