import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const socket = {
  namespaced: true,
  state: {
  },
  actions: {
    "SOCKET_EVENT_NAME"() {  // note 'SOCKET_' here is a pre-configured prefix
      // do something
      window.console.log('sup from store');
    }
  }
};

export default socket;
