import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import axios from "@/common/axios";
import { setAuthorizationHeader } from "@/common/utilities";

const ADD_NOTES = "ADD_NOTES";
const ADD_NOTE_TO_STACK = "ADD_NOTE_TO_STACK";
const DELETE_NOTE_FROM_STACK = "DELETE_NOTE_FROM_STACK";
const LOGOUT_USER = "LOGOUT_USER";

const note = {
  namespaced: true,
  state: {
    charts: []
  },
  mutations: {
    ADD_NOTES(state, data) {
      state.charts = state.charts.concat(data);
    },
    ADD_NOTE_TO_STACK(state, note) {
      state.charts.unshift(note);
    },
    DELETE_NOTE_FROM_STACK(state, note) {
      if (state.charts.length) {
        let i = state.charts.map(note => note.id).indexOf(note.id);
        state.charts.splice(i, 1);
      }
    },
    LOGOUT_USER(state) {
      state.charts = [];
    }
  },
  getters: {
    charts(state) {
      return state.charts;
    }
  },
  actions: {
    // API Calls
    async getUserCharts({ commit, rootGetters }, data) {
      try {
        setAuthorizationHeader(rootGetters["user/accessToken"]);
        const response = await axios.get("charts", {
          params: {
            sort: data.sort,
            order: data.order,
            page: data.page,
            limit: data.limit
          }
        });
        commit(ADD_NOTES, response.data);
        return response.data;
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async getNote({ rootGetters }, data) {
      try {
        setAuthorizationHeader(rootGetters["user/accessToken"]);
        const response = await axios.get("charts/" + data);
        return response.data;
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async deleteNote({ rootGetters }, data) {
      try {
        setAuthorizationHeader(rootGetters["user/accessToken"]);
        return await axios.delete("charts/" + data.id);
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },

    // Only Mutations
    async userLogout({ commit }) {
      try {
        commit(LOGOUT_USER);
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async addNoteToStack({ commit }, note) {
      try {
        commit(ADD_NOTE_TO_STACK, note);
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async deleteNoteFromStack({ commit }, note) {
      try {
        commit(DELETE_NOTE_FROM_STACK, note);
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    }
  }
};

export default note;
