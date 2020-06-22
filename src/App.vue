<template>
  <v-app>
    <v-container>
      <v-card width="800" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display-1">Buckhill Todo App!</h1>
        </v-card-title>
        <TodoList />
      </v-card>
    </v-container>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate />
    </v-overlay>
  </v-app>
</template>

<script lang="ts">
import { mapState } from "vuex";
import Vuetify from 'vuetify';
import TodoList from "./components/TodoList.vue";

export default {
  components: {
    TodoList,
  },
  computed: mapState([
    'isLoading',
  ]),
};
</script>
