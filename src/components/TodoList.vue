<template>
  <div>
    <TodoTextInput />
    <v-list v-if="todos.length" three-line subheader>
      <TodoListItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
      ></TodoListItem>
    </v-list>
    <v-subheader class="subheading" v-else>
      No todos to be done. Add a new todo in the input above.
    </v-subheader>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import TodoTextInput from "./TodoTextInput.vue";
import TodoListItem from "./TodoListItem.vue";
import Vuetify from 'vuetify';

export default {
  components: {
    TodoTextInput,
    TodoListItem,
  },
  computed: mapState([
    'todos',
  ]),
}
</script>
