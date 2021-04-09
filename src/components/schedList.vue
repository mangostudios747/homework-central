<template>
  <div>
    <div v-if="getFocusedSched.holidayReason">
      <h1>{{ getFocusedSched.holidayReason }}</h1>
    </div>
    <div v-else>
      <course-block
        v-for="course of getFocusedSched.schedule"
        :course="course"
        :key="course.name"
      >
      </course-block>
      <mini-bar
        :focused-date="$store.state.focusedDate"
        :schedule="getFocusedSched.schedule"
        :time="$store.state.time"
      ></mini-bar>
    </div>
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
