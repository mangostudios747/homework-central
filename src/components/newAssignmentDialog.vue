<template>
  <div>
    <b-modal
      centered
      ok-title="Save"
      cancel-title="Never mind"
      @cancel="cancelOperation"
      @ok="saveAssignment"
      v-model="$store.state.dialogs.newAssignment"
      title="New Assignment"
    >
      <b-textarea
        v-model="title"
        autofocus
        trim
        placeholder="Assignment"
      ></b-textarea>

      <b-form-datepicker
        class="my-2"
        today-button
        reset-button
        close-button
        v-model="dueDate"
        value-as-date
      />
      <b-dropdown variant="light">
        <template #button-content>
          <b-form-tag
            :style="{
              backgroundColor:
                $store.state.tags[type].color[$store.state.settings.theme],
            }"
            no-remove
            >{{ $store.state.tags[type].name }}</b-form-tag
          >
        </template>
        <b-dropdown-item-button
          @click="
            () => {
              type = k;
            }
          "
          :key="k"
          v-for="(t, k) of $store.state.tags"
        >
          <b-form-tag
            :title="t.name"
            :style="{ backgroundColor: t.color[$store.state.settings.theme] }"
            no-remove
            >{{ t.name }}</b-form-tag
          >
        </b-dropdown-item-button>
      </b-dropdown>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "newAssignmentDialog",
  data: () => ({
    title: "",
    dueDate: "",
    type: "hw",
  }),
  methods: {
    async saveAssignment() {
      await this.$store.dispatch("createNewAssignment", {
        title: this.title,
        dueDate: +this.dueDate,
        type: this.type,
      });
      console.log(this.title);
      this.title = "";
      this.dueDate = "";
      this.type = "hw";
    },
    cancelOperation() {
      this.title = "";
      this.$store.dispatch("cancelCreateNewAssignment");
    },
  },
};
</script>

<style scoped></style>
