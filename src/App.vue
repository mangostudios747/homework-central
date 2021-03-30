<template>
  <div id="app">
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
<style></style>
