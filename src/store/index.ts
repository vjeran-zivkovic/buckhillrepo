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

let itemIndex = 0;
const itemsPerPage = 10;

export default new Vuex.Store({
  state: {
    page: 1,
    isLoading: false,
    todos: [] as TodoItem[],
  },

  mutations: {
    [actionTypes.SET_PAGE](state, page) {
      state.page = page;
    },
    [actionTypes.SET_LOADING](state, isLoading) {
      state.isLoading = isLoading;
    },
    [actionTypes.ADD_NEW_TODO](state, todoTitle) {
      state.todos.push({
        id: -1,
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
      const item = { ...todoItem };
      // new item
      if (todoItem.id === -1) {
        item.id = itemIndex++;
      }
      state.todos = updateObjectInArray(state.todos, { index, item });
    },
  },

  actions: {
    setPage({ commit }, page) {
      commit(actionTypes.SET_PAGE, page);
    },
    addNewTodo({ commit }, todoTitle) {
      commit(actionTypes.ADD_NEW_TODO, todoTitle);
      if (this.getters.currentPageTodos.length === itemsPerPage) {
        const lastPage = this.getters.totalPages;
        commit(actionTypes.SET_PAGE, lastPage);
      }
    },
    // CRUD operations - simulate API calls with the timeouts
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

  getters: {
    currentPageTodos: state => {
      return state.todos.slice((state.page - 1) * itemsPerPage, state.page * itemsPerPage);
    },
    totalPages: state => {
      const itemsCount = state.todos.length;
      return Math.ceil(itemsCount / itemsPerPage);
    },
  }
});
