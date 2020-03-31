import Vue from 'vue';
import Vuex from 'vuex';
import {themes} from '@/common/config';

Vue.use(Vuex);

const common = {
  namespaced: true,

  state: {
    themeName: themes.defaultTheme,
    theme: themes[themes.defaultTheme],
    showFooter: true,
  },
  mutations: {
    SET_FOOTER_VISIBILITY(state, show) {
      state.showFooter = show;
    },
    CHANGE_THEME(state, newThemeName) {
      state.theme = themes[newThemeName] || themes[state.themeName];
      state.themeName = newThemeName;  // needs to be last
    },
  },
};

export default common;
