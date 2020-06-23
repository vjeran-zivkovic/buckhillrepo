<template>
  <div>
    <TodoTextInput />
    <v-list v-if="currentPageTodos.length" three-line subheader>
      <TodoListItem
        v-for="todo in currentPageTodos"
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
import { mapGetters } from "vuex";
import Vuetify from "vuetify";
import Vue from "vue";
import TodoTextInput from "./TodoTextInput.vue";
import TodoListItem from "./TodoListItem.vue";
import { TodoItem } from "../store";

interface Computed {
  currentPageTodos: TodoItem[];
}

export default Vue.extend<{}, {}, Computed> ({
  components: {
    TodoTextInput,
    TodoListItem,
  },
  computed: mapGetters([
    'currentPageTodos',
  ]),
})
</script>
