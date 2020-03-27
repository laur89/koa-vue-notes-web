import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const common = {
  namespaced: true,

  state: {
    theme: 'primary',
  },
};

export default common;
