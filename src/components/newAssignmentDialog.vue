<template>
  <div>
    <b-modal
      centered
      ok-title="Save"
      cancel-title="Never mind"
      v-model="$store.state.dialogs.newAssignment"
      title="New Assignment"
    >
      <b-textarea autofocus trim placeholder="Assignment"></b-textarea>
      <b-dropdown text=""> </b-dropdown>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "newAssignmentDialog",
  data: () => ({
    title: "",
  }),
  methods: {
    cancelOperation() {
      this.title = "";
      this.$store.dispatch("cancelCreateNewAssignment");
    },
  },
};
</script>

<style scoped></style>
