<template>
  <b-card
    no-body
    class="card text-white my-2 py-0"
    tabindex="0"
    style="border-radius: 10px; border-color: transparent"
    :style="{
      backgroundColor:
        course.color.hex ||
        course.color ||
        $store.state.settings.colors[course.hcname] ||
        $store.state.settings.colors['Other'],
    }"
  >
    <div
      class="card-body"
      :class="
        isLight(course.color.hex || $store.state.settings.colors[course.hcname])
          ? 'text-dark ignore-theme'
          : 'text-light ignore-theme'
      "
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

export default {
  name: "CourseBlock",

  props: ["course", "idx"],
  methods: {
    isLight,
  },
};
</script>

<style scoped></style>
