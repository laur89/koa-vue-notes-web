import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import axios from "@/common/axios";
import { setAuthorizationHeader } from "@/common/utilities";

const ADD_CHARTS = "ADD_CHARTS";
const ADD_NOTE_TO_STACK = "ADD_NOTE_TO_STACK";
const DELETE_NOTE_FROM_STACK = "DELETE_NOTE_FROM_STACK";
const LOGOUT_USER = "LOGOUT_USER";

const chart = {
  namespaced: true,
  state: {
    charts: []
  },
  mutations: {
    ADD_CHARTS(state, data) {
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
        commit(ADD_CHARTS, response.data);
        return response.data;
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async getChartSlice({ rootGetters }, params) {
      try {
        setAuthorizationHeader(rootGetters["user/accessToken"]);
        const response = await axios.get(`charts/${params.id}/slice`, {
          params: {
            anchorTime: params.anchorTime,
            numberOfDataPoints: params.numberOfDataPoints,
            direction: params.direction,
          }
        });
        return response.data;
      } catch (error) {
        return Promise.reject(error.response ? error.response : error);
      }
    },
    async getChartTail({ rootGetters }, params) {
      try {
        setAuthorizationHeader(rootGetters["user/accessToken"]);
        const response = await axios.get(`charts/${params.id}/tail`, {
          params: {
            span: params.span
          }
        });
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

export default chart;
