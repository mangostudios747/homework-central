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
      <span class="d-inline h2 mr-3">{{ s.name }}</span
      ><span>{{ s.room }}</span>
    </p>
    <span class="d-block"
      ><i>{{ s.dept }}</i></span
    >
    <span class="d-block"> {{ s.other }}</span>
    <a class="d-block" v-if="s.email" :href="`mailto:${s.email}`">{{
      s.email
    }}</a>

    <a class="d-block" v-if="s.phone" :href="`tel:650-${s.phone}`"
      >(650)-{{ s.phone }}</a
    >
    <table v-if="s.periods" class="table mt-5 b-table">
      <thead>
        <tr>
          <th :key="e" v-for="e of ['Period', 'S1', 'S2']">{{ e }}</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="pid" v-for="(period, pid) of periods">
          <td>{{ period }}</td>
          <td :key="x" v-for="(p, x) of s.periods[pid] || [, ,]">
            {{ (p || [])[0] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import staff from "@/plugins/staff.json";
export default {
  data: () => ({
    periods: {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      P: "PRIME",
      S: "SELF",
    },
  }),
  computed: {
    s() {
      return staff[this.$route.params.id] || {};
    },
    starred: {
      get() {
        return (
          this.$store.state.settings.starredPeople.staff[
            this.$route.params.id
          ] === true
        );
      },
      set(v) {
        console.log(v);
        this.$store.commit("settings/starPerson", {
          type: "staff",
          id: this.$route.params.id,
          b: v,
        });
      },
    },
  },
};
</script>

<style></style>
