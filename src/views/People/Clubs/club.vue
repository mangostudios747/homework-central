<template>
  <div class="mt-5">
    <p>
      <b-icon
        class="mr-2 mb-1"
        style="cursor: pointer"
        @click="starred = !starred"
        :variant="starred ? 'warning' : ''"
        font-scale="1.5"
        :icon="starred ? 'star-fill' : 'star'"
      />
      <span class="d-inline h2">{{ c.name }}</span>
      <b-badge class="mx-2" v-if="c.new" variant="primary">New</b-badge>
    </p>
    <table class="table b-table">
      <tr>
        <th>Time</th>
        <td>{{ c.time }}</td>
      </tr>
      <tr>
        <th>Day</th>
        <td>{{ c.day }}</td>
      </tr>
      <tr>
        <th>Room</th>
        <td>{{ c.room }}</td>
      </tr>
      <tr>
        <th>President</th>
        <td>{{ c.prez }}</td>
      </tr>
      <tr>
        <th>Advisor</th>
        <td>{{ c.advisor }}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>{{ c.email }}</td>
      </tr>
    </table>
    <p>{{ c.desc }}</p>
  </div>
</template>

<script>
import clubs from "@/plugins/clubs.json";
export default {
  computed: {
    c() {
      return clubs[this.$route.params.id] || {};
    },
    starred: {
      get() {
        return (
          this.$store.state.settings.starredPeople.clubs[
            this.$route.params.id
          ] === true
        );
      },
      set(v) {
        console.log(v);
        this.$store.commit("settings/starPerson", {
          type: "clubs",
          id: this.$route.params.id,
          b: v,
        });
      },
    },
  },
};
</script>

<style></style>
