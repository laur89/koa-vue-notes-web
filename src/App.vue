<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>

    <navbar></navbar>

    <keep-alive include="account">
      <router-view></router-view>
    </keep-alive>

    <footer-main></footer-main>
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
  computed: {
    ...mapState({
      theme: state => state.common.theme,
    }),
  },
  watch: {
    theme: {
      immediate: true,  // execute at init
      handler(newVal, oldVal) {
        document.body.style.background = newVal.bg;
        document.body.style.color = newVal.txt;  // main foreground color
      },
    },
  }
};
</script>
