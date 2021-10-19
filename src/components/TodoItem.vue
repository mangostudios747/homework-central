<template>
  <b-list-group-item
    estyle="{
      backgroundColor: chroma(item.color)
        .alpha({ dark: 0.4, light: 0.3 }[$store.state.settings.theme])
        .brighten(1)
        .hex(),
    }"
    style="background-color: var(--grey3)"
    class="d-flex"
  >
    <b-form-checkbox
      :style="{
        '--checkcolor': chroma(item.color)
          [{ dark: 'darken', light: 'brighten' }[$store.state.settings.theme]](
            2
          )
          .hex(),
        '--checkfocus': chroma(item.color).brighten(2).hex(),
        '--checkshadow': chroma(item.color).hex() + '08',
      }"
      @input="toggleCompletion"
      :checked="completed"
    />
    <span
      :style="{
        color: chroma(item.color)
          .desaturate(0)
          [{ dark: 'brighten', light: 'darken' }[$store.state.settings.theme]](
            2
          )
          .hex(),
      }"
      >{{ item.title }}</span
    >
    <!-- chroma(item.color).desaturate(2)[({dark:'brighten', 'light':'darken'})[$store.state.settings.theme]]().hex() -->
    <b-form-tag
      variant="none"
      class="mx-1"
      :style="{
        backgroundColor:
          $store.state.tags[item.type].color[$store.state.settings.theme],
      }"
      no-remove
      >{{ $store.state.tags[item.type].name }}</b-form-tag
    >
    <i
      :style="{
        color: chroma(item.color)
          .desaturate(3)
          .darken(1)
          [{ dark: 'brighten', light: 'darken' }[$store.state.settings.theme]]()
          .hex(),
      }"
      class="ml-1"
      >{{ item.dueDate | moment("from", "now") }}</i
    >
    <b-btn-close @click="deleteItem" class="ml-auto" />
  </b-list-group-item>
</template>

<script>
import chroma from "chroma-js";

export default {
  name: "TodoItem",
  data: () => ({
    chroma,
    en: { dark: "darken", light: "lighten" },
  }),
  props: {
    completed: {
      type: Boolean,
    },
    idx: {
      type: Number,
    },
    item: {
      type: Object,
      default: () => ({
        title: "Vestibulum at eros",
        dueDate: new Date("July 21 2021 4:00 PM"),
        type: "hw",
        hcname: null,
      }),
    },
  },
  methods: {
    toggleCompletion() {
      // add the item to the other list
      this.$store.commit("settings/addAssignment", {
        hcname: this.item.hcname,
        asg: {
          title: this.item.title,
          dueDate: this.item.dueDate,
          type: this.item.type,
        },
        completed: !this.completed,
      });
      // delete the item from the current list
      this.deleteItem();
    },
    deleteItem() {
      // we have idx and hcname
      this.$store.commit("settings/deleteAssignment", {
        idx: this.idx,
        hcname: this.item.hcname,
        completed: this.completed,
      });
    },
  },
};
</script>

<style>
.custom-control-input[type="checkbox"]:checked ~ .custom-control-label::before {
  color: #fff;
  --checkcolor: inherit;
  --checkfocus: inherit;
  --checkshadow: inherit;
  border-color: var(--checkcolor) !important;
  background-color: var(--checkcolor) !important;
}
.custom-control-input[type="checkbox"]:focus:not(:checked)
  ~ .custom-control-label::before {
  border-color: var(--checkfocus);
}
.custom-control-input[type="checkbox"]:focus ~ .custom-control-label::before {
  box-shadow: 0 0 0 0.2rem var(--checkshadow);
}
</style>
