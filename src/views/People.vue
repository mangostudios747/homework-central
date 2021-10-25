<template>
  <div>
    <div class="row">
      <div
        class="col"
        :class="$route.path.split('/')[3] ? 'd-none d-md-block' : 'd-block'"
      >
        <div class="mb-2">
          <input
            type="text"
            placeholder="Search"
            class="form-control form-control-sm"
            style="
              background-color: var(--grey4);
              border-color: var(--grey4);
              color: var(--grey2);
            "
          />
        </div>
        <b-nav tabs fill>
          <b-nav-item
            :active="$route.path.split('/')[2] === 'clubs'"
            to="/people/clubs"
          >
            Clubs
          </b-nav-item>
          <b-nav-item
            :active="$route.path.split('/')[2] === 'staff'"
            to="/people/staff"
          >
            Staff
          </b-nav-item>
          <b-nav-item
            :active="$route.path.split('/')[2] === 'starred'"
            to="/people/starred"
          >
            Starred
          </b-nav-item>
        </b-nav>
        <div class="mb-3" style="height: 75vh; overflow: scroll">
          <b-list-group v-if="$route.path.split('/')[2] === 'starred'">
            <b-list-group-item
              :to="`/people/staff/${sid}`"
              :key="sid"
              v-for="sid of Object.keys(
                $store.state.settings.starredPeople.staff
              ).filter((e) => $store.state.settings.starredPeople.staff[e])"
            >
              <b-icon class="mr-2" variant="warning" icon="star-fill" />
              {{ staff[sid].name }}
              <b-icon-chevron-right class="float-right mt-1" />
            </b-list-group-item>
            <b-list-group-item
              :to="`/people/clubs/${cid}`"
              :key="cid"
              v-for="cid of Object.keys(
                $store.state.settings.starredPeople.clubs
              ).filter((e) => $store.state.settings.starredPeople.clubs[e])"
            >
              <b-icon class="mr-2" variant="warning" icon="star-fill" />
              {{ clubs[cid].name }}
              <b-badge variant="primary ml-2" v-if="clubs[cid].new"
                >New</b-badge
              >
              <b-icon-chevron-right class="float-right mt-1" />
            </b-list-group-item>
          </b-list-group>
          <b-list-group v-else-if="$route.path.split('/')[2] === 'staff'">
            <b-list-group-item
              :to="`/people/staff/${sid}`"
              :key="sid"
              v-for="(staf, sid) of staff"
            >
              <b-icon
                class="mr-2"
                v-if="$store.state.settings.starredPeople.staff[sid]"
                variant="warning"
                icon="star-fill"
              />
              {{ staf.name }}
              <b-icon-chevron-right class="float-right mt-1" />
            </b-list-group-item>
          </b-list-group>
          <b-list-group v-else>
            <b-list-group-item
              :to="'/people/clubs/' + cid"
              :key="cid"
              v-for="(club, cid) of clubs"
            >
              <b-icon
                class="mr-2"
                v-if="$store.state.settings.starredPeople.clubs[cid]"
                variant="warning"
                icon="star-fill"
              />{{ club.name }}
              <b-badge variant="primary ml-2" v-if="club.new">New</b-badge>
              <b-icon-chevron-right class="float-right mt-1" />
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
      <div
        style="height: 94vh; overflow: scroll"
        :class="$route.path.split('/')[3] ? 'd-block' : 'd-none d-md-block'"
        class="col-8"
      >
        <div class="container">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clubs from "@/plugins/clubs.json";
import staff from "@/plugins/staff.json";
export default {
  name: "People",
  data: () => ({
    clubs,
    staff,
  }),
};
</script>

<style scoped></style>
