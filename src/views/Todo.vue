<template>
  <div>
    <h1>Todo</h1>
    <b-list-group>
      <b-list-group-item>Cras justo odio</b-list-group-item>
      <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
      <b-list-group-item>Morbi leo risus</b-list-group-item>
      <b-list-group-item>Porta ac consectetur ac</b-list-group-item>
      <todo-item></todo-item>
    </b-list-group>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";
export default {
  name: "Todo",
  components: { TodoItem },
};
</script>

<style scoped></style>
