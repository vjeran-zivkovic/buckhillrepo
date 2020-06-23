<template>
  <v-card-text>
    <v-text-field
      type="text"
      label="Write your todo..."
      v-model="todoInputText"
      @keydown.enter="onInputEnterKeydown"
    />
  </v-card-text>
</template>

<script lang="ts">
import { mapActions } from "vuex";
import Vue from "vue";
import Vuetify from "vuetify";

interface Data {
  todoInputText: string;
}

interface Methods {
  onInputEnterKeydown: () => void;
  addNewTodo: (title: string) => void;
}

export default Vue.extend<Data, Methods, {}> ({
  data() {
    return {
      todoInputText: "",
    };
  },
  methods: {
    onInputEnterKeydown() {
      const todoTitle = this.todoInputText.trim();
      if (todoTitle.length === 0) return;
      this.addNewTodo(todoTitle);
      this.todoInputText = "";
    },
    ...mapActions([
      'addNewTodo',
    ]),
  },
})
</script>
