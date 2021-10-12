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
              .desaturate(4)
              .darken(2)
              .hex(),
          }"
          variant="none"
          >{{ dclass.name }}</b-list-group-item
        >
        <todo-item
          :key="idx"
          :completed="false"
          v-for="(asg, idx) of dclass.assignments"
          :item="{
            title: asg.title,
            dueDate: asg.dueDate,
            color: dclass.color.hex || dclass.color,
            type: asg.type,
          }"
        ></todo-item>
        <todo-item
          :key="idx"
          :completed="true"
          v-for="(asg, idx) of dclass.completed"
          :item="{
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
