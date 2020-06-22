import Vue from "vue";
import Vuex from "vuex";
import * as actionTypes from "./action-types";
import { updateObjectInArray } from '@/helpers/vuex-helper';

Vue.use(Vuex);

export interface TodoItem {
  id: number; // auto-increment
  title: string; // 1-255 chars
  description: string; // 1- 255 chars
  done: boolean;
  due_at: string | null; // yyyy-mm-dd, optional
}

let index = 0;

export default new Vuex.Store({
  state: {
    isLoading: false,
    todos: [] as TodoItem[],
  },

  mutations: {
    [actionTypes.SET_LOADING](state, isLoading) {
      state.isLoading = isLoading;
    },
    [actionTypes.ADD_TODO](state, todoTitle) {
      state.todos.push({
        id: index++,
        title: todoTitle,
        done: false,
        description: "",
        due_at: null,
      } as TodoItem);
    },
    [actionTypes.REMOVE_TODO](state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id);
    },
    [actionTypes.UPDATE_TODO](state, todoItem) {
      const index = state.todos.findIndex(todo => todo.id === todoItem.id);
      state.todos = updateObjectInArray(state.todos, { index, item: todoItem });
    },
  },

  actions: {
    // CRUD operations - simulate API calls with the timeouts
    addTodo({ commit }, todoTitle) {
      commit(actionTypes.SET_LOADING, true);
      setTimeout(() => {
        commit(actionTypes.ADD_TODO, todoTitle);
        commit(actionTypes.SET_LOADING, false);
      }, 500);
    },
    removeTodo({ commit }, id) {
      commit(actionTypes.SET_LOADING, true);
      setTimeout(() => {
        commit(actionTypes.REMOVE_TODO, id);
        commit(actionTypes.SET_LOADING, false);
      }, 500);
    },
    updateTodo({ commit }, id) {
      commit(actionTypes.SET_LOADING, true);
      setTimeout(() => {
        commit(actionTypes.UPDATE_TODO, id);
        commit(actionTypes.SET_LOADING, false);
      }, 500);
    },
  },
});
