import Vue from 'vue';
import Vuex from 'vuex';
import {themes} from '@/common/config';

Vue.use(Vuex);

const common = {
  namespaced: true,

  state: {
    //themeName: themes.defaultTheme,
    theme: themes[themes.defaultTheme],
    showFooter: true,
    chartVisible: false,
    darkModeEnabled: true,
  },
  mutations: {
    SET_FOOTER_VISIBILITY(state, show) {  // TODO: drop this and instead create showFooter() getter that's based on state.chartVisible value??
      state.showFooter = show;
    },
    SET_CHART_VISIBLE(state, chartVisible) {
      state.chartVisible = !!chartVisible;
    },
    TOGGLE_THEME(state, isDark) {
      state.theme = themes[isDark ? 'dark' : 'light'];
      state.darkModeEnabled = isDark;
    },
  },
};

export default common;
