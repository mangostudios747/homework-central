<template>
  <b-container>
    <div class="topnav sticky-top bg-light pt-3" style="opacity: 0.8">
      <h1 class="text-center" v-cloak>
        {{ $store.state.time | moment("h:mm:ss a") }}
      </h1>
      <h1 class="text-center">
        <a
          class="btn text-center btn-lg"
          style="cursor: pointer"
          @click="() => {}"
          ><b-icon-chevron-left /></a
        ><input
          id="dp"
          style="height: 0; width: 0; opacity: 0; position: absolute"
          data-provide="datepicker"
        /><label
          style="cursor: pointer"
          v-cloak
          for="dp"
          class="text-primary text-center h3"
          >{{ $store.state.time | moment("ddd, MMM D") }}</label
        ><a
          style="cursor: pointer"
          class="btn text-center btn-lg"
          @click="() => {}"
          ><b-icon-chevron-right
        /></a>
      </h1>
    </div>
    {{ $store.getters.getFocusedSched }}
  </b-container>
</template>

<script>
export default {
  name: "Schedule",
};
</script>

<style scoped></style>
