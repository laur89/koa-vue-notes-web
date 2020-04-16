// Mutation Observer
// https://bootstrap-vue.js.org/docs#migrating-a-project-already-using-bootstrap
import "mutationobserver-shim";

// Intersection Observer polyfill
import "intersection-observer";

import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import BootstrapVue from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";  // TODO: unsure how necessary this is; we're already including some bootstrap css from app.scss
Vue.use(BootstrapVue);
//import io from 'socket.io-client';

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faUserCog, faSave, faAngleLeft, faChevronDown, faFrownOpen, faTrash, faSyncAlt,
    faUser, faInfoCircle, faCircleNotch, faPaperPlane, faLongArrowAltRight
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faUserCog,
    faSave,
    faAngleLeft,
    faChevronDown,
    faFrownOpen,
    faTrash,
    faSyncAlt,
    faUser,
    faInfoCircle,
    faCircleNotch,
    faPaperPlane,
    faLongArrowAltRight
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const sockOpts = { path: '/sock' }; //Options object to pass into SocketIO
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
        debug: true,
        //connection: io('http://localhost:4001', sockOpts), // options object is optional
        connection: process.env.VUE_APP_SOCK_URL,
        vuex: {
            store,
            actionPrefix: "SOCKET_",
            //mutationPrefix: "SOCKET_"
        },
        options: sockOpts
    })
);

import Toasted from "vue-toasted";
Vue.use(Toasted, {
    theme: 'toasted-primary',
    position: 'top-right',
    duration: 3000,
    keepOnHover: true, // do not fade away if mouse is over
    iconPack: 'fontawesome',
    singleton: false,  // whether to allow single toast at a time
});

import VueProgressBar from "vue-progressbar";
Vue.use(VueProgressBar, {
    color: "#ADE027",
    failedColor: "#F43D41",
    thickness: "3px",
    transition: {
        speed: "0.2s",
        opacity: "0.6s",
        termination: 300,
    },
    autoRevert: true,
    location: "top",
    inverse: false,
});

import "./assets/css/app.scss"; // app styles

Vue.config.productionTip = true;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount("#app");
