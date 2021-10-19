<template>
  <b-container style="padding-bottom: 5rem" class="pt-3">
    <h2>Todo</h2>
    <b-list-group>
      <div
        :key="dclass.hcname"
        v-for="dclass of $store.state.settings.dclasses"
      >
        <b-list-group-item
          :style="{
            backgroundColor: chroma(dclass.color.hex || dclass.color)
              .desaturate(2)
              .alpha(0.4)
              .hex(),
          }"
          variant="none"
          >{{ dclass.name }}
          <b-icon-plus-circle
            v-b-tooltip.hover
            title="Add new"
            @click="
              () => $store.dispatch('promptCreateNewAssignment', dclass.hcname)
            "
            style="cursor: pointer"
            class="bi-type-bold float-right mt-1"
            scale="1.2"
          />
        </b-list-group-item>
        <todo-item
          :key="'todo' + idx"
          :completed="false"
          v-for="(asg, idx) of dclass.assignments"
          :item="{
            hcname: dclass.hcname,
            title: asg.title,
            dueDate: asg.dueDate,
            color: dclass.color.hex || dclass.color,
            type: asg.type,
          }"
        ></todo-item>
        <todo-item
          :key="'completed-' + idx"
          :completed="true"
          v-for="(asg, idx) of dclass.completed"
          :item="{
            hcname: dclass.hcname,
            title: asg.title,
            dueDate: asg.dueDate,
            color: dclass.color.hex || dclass.color,
            type: asg.type,
          }"
        ></todo-item>
      </div>
    </b-list-group>
  </b-container>
</template>

<script>
import chroma from "chroma-js";
import TodoItem from "@/components/TodoItem";
export default {
  name: "Todo",
  data: () => ({
    chroma,
  }),
  components: { TodoItem },
};
</script>

<style scoped></style>
