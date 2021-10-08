<template>
  <b-container style="padding-bottom: 5rem" class="pt-3">
    <h2>Todo</h2>
    <b-list-group>
      <b-list-group-item>Cras justo odio</b-list-group-item>
      <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
      <b-list-group-item>Morbi leo risus</b-list-group-item>
      <b-list-group-item>Porta ac consectetur ac</b-list-group-item>
      <todo-item></todo-item>
    </b-list-group>
  </b-container>
</template>

<script>
import TodoItem from "@/components/TodoItem";
export default {
  name: "Todo",
  components: { TodoItem },
};
</script>

<style scoped></style>
