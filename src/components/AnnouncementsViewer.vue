<template>
  <div id="announcements">
    <b-col>
      <b-row
        ><h5 class="mt-1">Announcements</h5>
        <b-btn-group size="sm">
          <b-btn
            v-b-tooltip.hover
            title="Previous"
            @click="focIndex++"
            :disabled="focIndex === announcements.length - 1"
            variant="white"
          >
            <b-icon icon="chevron-left"></b-icon>
          </b-btn>
          <b-btn
            v-b-tooltip.hover="focIndex !== 0"
            :title="focIndex !== 0 ? 'Next' : null"
            @click="focIndex--"
            :disabled="focIndex === 0"
            variant="white"
          >
            <b-icon icon="chevron-right"></b-icon>
          </b-btn>
        </b-btn-group>
      </b-row>
      <b-row>
        <b-card
          text-variant="dark"
          title-tag="h5"
          :title="announcement.title"
          class="mt-2"
          style="width: 100%"
        >
          <div v-html="announcement.body"></div>

          <template #footer>
            <span
              v-b-tooltip.left.hover
              :title="
                new Date(announcement.timestamp)
                  | moment(
                    `dddd, MMMM D,  YYYY ${
                      $store.state.settings.timeMode === 24 ? 'H' : 'h'
                    }:mm A`
                  )
              "
              class="text-muted p-1"
              >{{
                new Date(announcement.timestamp) | moment(`MMMM Do YYYY`)
              }}</span
            >
          </template>
        </b-card>
      </b-row>
    </b-col>
  </div>
</template>

<script>
const announcements = require("@/plugins/PSA.json");

export default {
  name: "AnnouncementsViewer",
  data: () => ({
    announcements,
    focIndex: 0,
  }),
  computed: {
    announcement() {
      return this.announcements[this.focIndex];
    },
  },
};
</script>

<style scoped></style>
