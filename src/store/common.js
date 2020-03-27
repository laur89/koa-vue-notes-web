import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const common = {
  namespaced: true,

  state: {
    theme: 'primary',
    showFooter: true,
  },
  mutations: {
    SET_FOOTER_VISIBILITY(state, show) {
      state.showFooter = show;
    },
  },
};

export default common;
