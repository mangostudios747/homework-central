<template>
  <div id="app" class="bg-light" style="height: 100vh; width: 100%">
    <router-view />
    <div
      class="bg-light container-fluid py-2"
      style="
        min-height: 6vh;
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
        z-index: 3;
      "
    >
      <b-nav pills fill>
        <b-nav-item exact-active-class="active" to="/"
          ><b-icon-calendar-fill
        /></b-nav-item>
        <b-nav-item exact-active-class="active" to="/people"
          ><b-icon-people-fill
        /></b-nav-item>
        <b-nav-item exact-active-class="active" to="/settings"
          ><b-icon-gear-fill
        /></b-nav-item>
        <b-nav-item exact-active-class="active" to="/utilities"
          ><b-icon-tools
        /></b-nav-item>
      </b-nav>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style>
@import "../public/css/theme.css";

.nav-fill .nav-item,
.nav-fill > .nav-link:hover:not(.active):not(.disabled) {
  background-color: rgba(187, 214, 254, 0.7);
}

.nav-fill .nav-item,
.nav-fill > .nav-link:focus:not(.active):not(.disabled) {
  background-color: rgba(187, 214, 254, 0.7);
}
.nav-fill .nav-item,
.nav-fill > .nav-link:hover.active {
  background-color: #085ad4;
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

.datepicker table tr td.active,
.datepicker table tr td.active.disabled,
.datepicker table tr td.active.disabled:hover,
.datepicker table tr td.active:hover {
  text-shadow: none;
  background-image: none !important;
  background-color: var(--bs-primary) !important;
  color: var(--bs-white) !important;
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
  background-color: rgba(187, 214, 254, 0.7);
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
