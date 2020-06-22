<template>
  <v-list-item>
    <v-list-item-action>
      <v-checkbox
        v-model="todo.done"
        @change="onItemCheckboxChange"
      />
    </v-list-item-action>
    <v-list-item-content v-if="!isItemEdit" @dblclick="onItemDoubleClick">
      <v-list-item-title :class="{done: todo.done}">{{ todo.title }}</v-list-item-title>
      <v-list-item-subtitle>{{ todo.description }}</v-list-item-subtitle>
      <v-list-item-subtitle>{{ todo.due_at }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-content v-else @keydown.enter="onItemEnterKeydown">
      <v-row no-gutters class="text-center ml-2">
        <v-col sm="5">
          <v-form ref="form">
            <v-text-field
              v-model="todo.title"
              label="Title"
              :rules="[rules.required, rules.counter]"
              counter
              maxlength="255"
            />
            <v-text-field
              v-model="todo.description"
              label="Description"
              placeholder="Add description"
              :rules="[rules.required, rules.counter]"
              counter
              maxlength="255"
            />
            <v-checkbox
              label="Due at"
              v-model="hasDueAt"
            />
            <v-btn color="primary" @click="onItemEnterKeydown">Save</v-btn>
          </v-form>
        </v-col>
        <v-col sm="7" v-if="hasDueAt">
          <v-date-picker v-model="todo.due_at" />
        </v-col>
      </v-row>
    </v-list-item-content>
    <v-btn class="mx-2" fab dark small color="red" v-if="todo.done" @click="removeTodo(todo.id)">
      <v-icon dark>mdi-close</v-icon>
    </v-btn>
  </v-list-item>
</template>

<script lang="ts">
import { mapActions } from "vuex";
import Vue from "vue";
import Vuetify from 'vuetify';
import { TodoItem } from "../store";

interface Data {
  isItemEdit: boolean;
  hasDueAt: boolean;
}

interface Methods {
  onItemDoubleClick: () => void;
  onItemEnterKeydown: () => void;
  onItemCheckboxChange: () => void;
  removeTodo: (id: number) => void;
  updateTodo: (item: TodoItem) => void;
}

interface Computed {
  getUpdatedTodoItem: TodoItem;
}

export default Vue.extend<Data, Methods, Computed, {}> ({
  props: {
    todo: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      isItemEdit: true,
      hasDueAt: false,
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 255 || 'Max 255 characters',
      },
    }
  },
  methods: {
    onItemDoubleClick() {
      if (this.todo.done) return;
      this.isItemEdit = !this.isItemEdit;
    },
    onItemEnterKeydown() {
      this.$refs.form.validate();
      if (!this.todo.title.length || !this.todo.description.length) return;
      this.updateTodo(this.getUpdatedTodoItem);
      this.isItemEdit = !this.isItemEdit;
    },
    onItemCheckboxChange() {
      this.updateTodo(this.getUpdatedTodoItem);
    },
    ...mapActions([
      'removeTodo',
      'updateTodo',
    ]),
  },
  computed: {
    getUpdatedTodoItem() {
      return {
        id: this.todo.id,
        title: this.todo.title,
        done: this.todo.done,
        due_at: this.hasDueAt ? this.todo.due_at : null,
      } as TodoItem;
    },
  },
})
</script>

<style scoped>
  .done {
    text-decoration: line-through;
  }
</style>
