<template>
  <b-card
    no-body
    class="card text-white my-3 py-0"
    tabindex="0"
    style="border-radius: 10px; border-color: transparent"
    :style="{
      backgroundColor: color,
      boxShadow: `0 0 5px 2px ${chroma(color).darken().hex()}`,
    }"
  >
    <div
      class="card-body"
      :style="{ color: isLight(color) ? '#1b263b' : '#fff' }"
    >
      <div class="h4" style="display: flex; justify-content: space-between">
        <span
          class="text-decoration-none"
          :class="
            isLight(
              course.color.hex ||
                course.color ||
                $store.state.settings.colors[course.hcname]
            )
              ? 'text-dark ignore-theme'
              : 'text-light ignore-theme'
          "
          >{{ course.name }}
          <span
            v-if="course.assignments && course.assignments.length"
            class="badge badge-light badge-pill"
            :class="'text-' + course.color"
            >{{ course.assignments.length }}
          </span>
        </span>
        <span>
          <b-btn
            target="_blank"
            href="https://pausdca.infinitecampus.org/campus/nav-wrapper/student/portal/student/responsive-schedule"
            v-if="course.hcname === 'Period 9'"
            variant="outline-light"
            >Make Appt
          </b-btn>
          <b-btn
            v-b-tooltip.hover
            title="Add Assignment"
            @click="
              () => $store.dispatch('promptCreateNewAssignment', course.hcname)
            "
            variant="link"
            ><b-icon-clipboard-plus variant="light"
          /></b-btn>
        </span>
      </div>

      <p>
        {{
          course.startDate
            | moment(
              `${$store.state.settings.timeMode === 24 ? "H" : "h"}:mm A`
            )
        }}
        to
        {{
          course.endDate
            | moment(
              `${$store.state.settings.timeMode === 24 ? "H" : "h"}:mm A`
            )
        }}
      </p>
      <p></p>
      <div
        class="progress"
        :style="{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }"
        v-if="course.isCurrent"
      >
        <div
          class="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          :style="{
            backgroundColor: course.color.hex || course.color,
            width: `${course.percentDone}%`,
          }"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ course.endingIn }} min left
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import { isLight } from "@/plugins/util";
import chroma from "chroma-js";
export default {
  name: "CourseBlock",
  data() {
    return {
      chroma,
    };
  },
  props: ["course", "idx"],
  methods: {
    isLight,
  },
  computed: {
    color() {
      return (
        this.course.color.hex ||
        this.course.color ||
        this.$store.state.settings.colors[this.course.hcname] ||
        this.$store.state.settings.colors["Other"]
      );
    },
  },
};
</script>

<style scoped></style>
