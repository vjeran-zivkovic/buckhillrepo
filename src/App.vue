<template>
  <v-app>
    <v-container>
      <v-card width="800" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display-1">Your Todo App!</h1>
        </v-card-title>
        <TodoList />
      </v-card>
    </v-container>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate />
    </v-overlay>
    <div class="text-center">
      <v-pagination
        :value="page"
        :length="totalPages"
        @input="onPageChange"
      ></v-pagination>
    </div>
  </v-app>
</template>

<script lang="ts">
import { mapState, mapActions, mapGetters } from "vuex";
import Vuetify from "vuetify";
import Vue from "vue";
import TodoList from "./components/TodoList.vue";

interface Methods {
  onPageChange: (page: number) => void;
  setPage: (page: number) => void;
}

interface Computed {
  isLoading: boolean;
  page: number;
  totalPages: number;
}

export default Vue.extend<{}, Methods, Computed> ({
  components: {
    TodoList,
  },
  methods: {
    onPageChange(page) {
      this.setPage(page);
    },
    ...mapActions([
      'setPage',
    ]),
  },
  computed: {
    ...mapState([
      'isLoading',
      'page',
    ]),
    ...mapGetters([
      'totalPages',
    ]),
  }
})
</script>
