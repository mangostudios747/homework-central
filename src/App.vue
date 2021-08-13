<template>
  <div
    id="app"
    :data-theme="$store.state.settings.theme"
    class="bg-light"
    style="min-height: 100vh; width: 100%; height: 110%"
  >
    <router-view />
    <div
      class="bg-light py-2"
      style="
        min-height: 6vh;
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
        z-index: 3;
      "
    >
      <b-nav
        pills
        style="flex-wrap: nowrap; margin: 0 0.5%"
        small
        tag="ul"
        justified
      >
        <b-nav-item
          style="width: 18%; margin: 0 0.5%"
          :key="n.to"
          v-for="n of navigation"
          exact-active-class="active"
          :to="n.to"
        >
          <b-col class="text-center">
            <b-row align-h="center">
              <b-icon :icon="n.icon" />
            </b-row>
            <b-row align-h="center">
              <span style="font-size: small">{{ n.title }}</span>
            </b-row>
          </b-col>
        </b-nav-item>
      </b-nav>
    </div>
    <new-assignment-dialog />
  </div>
</template>
<script>
import NewAssignmentDialog from "@/components/newAssignmentDialog";
export default {
  name: "App",
  components: { NewAssignmentDialog },
  data: () => ({
    navigation: [
      {
        to: "/utilities",
        icon: "tools",
        title: "Utilities",
      },
      {
        to: "/clubs",
        icon: "signpost-split-fill",
        title: "Clubs",
      },
      {
        to: "/",
        icon: "calendar-fill",
        title: "Schedule",
      },
      {
        to: "/todo",
        icon: "list-check",
        title: "Todo",
      },
      {
        to: "/settings",
        icon: "gear-fill",
        title: "Settings",
      },
    ],
  }),
};
</script>
<style lang="scss">
@import "../public/css/theme.css";
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");

.nav-fill .nav-item,
.nav-fill > .nav-link:hover:not(.active):not(.disabled) {
  background-color: var(--primary-dull) !important;
}

.nav-link:not(.active):hover {
  background-color: var(--primary-dull) !important;
}

.nav-fill .nav-item,
.nav-fill > .nav-link:hover.active {
  background-color: var(--primary);
}

.nav-fill .nav-item,
.nav-fill > .nav-link:not(.active):not(.disabled) {
  background-color: #e9ecef;
}

.nav-fill .nav-item,
.nav-fill > .nav-link {
  background-color: #e9ecef;
  margin-left: 0.18em;
  margin-right: 0.18em;
}

.nav-fill .nav-item,
.nav-fill > .nav-link:hover:not(.active):not(.disabled) {
  background-color: var(--primary-dull);
}

.datepicker table tr td.active,
.datepicker table tr td.active.disabled,
.datepicker table tr td.active.disabled:hover,
.datepicker table tr td.active:hover {
  text-shadow: none;
  background-image: none !important;
  background-color: var(--primary) !important;
  color: var(--white) !important;
}

.mini-block {
  background-color: var(--grey3);
}

@media (max-width: 876px) {
  .mini-block {
    border-radius: 0.7rem;
  }
}

@media (min-width: 876.1px) {
  .mini-block {
    border-radius: 0.2rem;
  }
}

.mini-block.today {
  font-weight: 800 !important;
  background-color: var(--grey4);
}

.mini-block:hover,
.mini-block:focus,
.mini-block.active {
  //@apply list-group-item-primary; // !important;
  background-color: var(--primary-dull);
}

.view {
  margin-bottom: 15vh;
}

.progress {
  background-color: #ffffff;
}

.list-group-item-action:focus {
  background-color: var(--grey1);
  color: var(--grey2);

  border-right-style: hidden;
}
</style>
