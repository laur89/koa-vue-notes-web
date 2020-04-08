<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>

    <navbar ref="navbar"></navbar>

    <keep-alive include="account">
      <router-view></router-view>
    </keep-alive>

    <footer-main ref="footer"></footer-main>
  </div>
</template>

<script>
import Navbar from '@/components/Partials/Navbar';
import FooterMain from '@/components/Partials/FooterMain';
import {mapState} from 'vuex';

export default {
  name: 'app',
  components: {
    Navbar,
    FooterMain
  },
  /*
  data() {
    return {
      enabledDropDowns: [],
    }
  },
  mounted() {
    this.$root.$on('bv::dropdown::show', bvEvent => {
      this.enabledDropDowns.push([bvEvent.componentId, bvEvent.target]);
    });

    this.$root.$on('bv::dropdown::hide', bvEvent => {
      for (let i = this.enabledDropDowns.length - 1; i >= 0; i--) {
        if (this.enabledDropDowns[i][0] === bvEvent.componentId) {
          this.enabledDropDowns.splice(i, 1);
          break;
        }
      }
    });

    document.addEventListener('keyup', e => {
      if (e.keyCode === 27) {  // escape key maps to keycode `27`
        //console.log('ESC pressed')
        this.enabledDropDowns.forEach(e => {
          e[1].getElementsByClassName('dropdown-toggle')[0].click();
        });
      }
    });
  },
   */
  computed: {
    ...mapState({
      theme: state => state.common.theme,
    }),
  },
  watch: {
    theme: {  // change the global theme settings (global as in on body element et al)
      immediate: true,  // execute at init
      handler(newVal, oldVal) {
        document.body.style.background = newVal.bg;
        document.body.style.color = newVal.txt;  // main foreground color
      },
    },
  }
};
</script>
