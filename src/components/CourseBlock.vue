<template>
  <b-card
    no-body
    class="card text-white my-2 py-0"
    tabindex="0"
    style="border-radius: 10px; border-color: transparent"
    :style="{
      backgroundColor:
        course.color.hex ||
        $store.state.settings.colors[course.hcname] ||
        $store.state.settings.colors['Other'],
    }"
  >
    <div class="card-body">
      <p class="h4">
        <a
          class="stretched-link text-decoration-none text-light"
          target="_blank"
          rel="noopener noreferrer"
          :href="course.zoom"
          >{{ course.name
          }}<span v-if="course.name === 'Gunn Together'">: Period 5</span></a
        >
        <span
          class="badge badge-light badge-pill"
          :class="'text-' + course.color"
          >{{ null }}</span
        >
      </p>
      {{ course.teacher }}

      <p class="text-white">
        {{ course.startDate | moment("h:mm A") }} to
        {{ course.endDate | moment("h:mm A") }}
      </p>
      <div class="progress" v-if="course.isCurrent">
        <div
          class="progress-bar"
          :class="course.color"
          role="progressbar"
          :style="'width: 50%'"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ 50 }} min left
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "CourseBlock",
  props: ["course"],
};
</script>

<style scoped></style>
