<template>
  <div v-if="show">
    <div id="sticky-footer-spacing"></div>
    <footer id="footer-main" class="footer-main">
      <div class="container">
        <span>
          Charting platform powered by <a href="https://github.com/QuantConnect/Lean"> LEAN trading engine</a>,
          a <a href="https://www.quantconnect.com">QuantConnect</a> <img src="@/assets/images/qc-logo-no-text-25.png" alt="QC"> product
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "footer-main",
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState({
      show: state => state.common.showFooter,
    }),
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/components/_variables.scss";

//This is just a blank div that sits about footer-main. This is needed
//because footer-main is absolutely positioned.
div#sticky-footer-spacing {
  //content: '\200b';
  //margin-top: 50px; //tied to footer height or what?
  height: 50px;
}

footer#footer-main {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;  // fixed footer height
  line-height: 50px;  // vertically center the text there
  background-color: $light-grey;
  text-align: center;
  color: lighten($black, 25%);

  a {
    color: lighten($black, 5%);
    text-decoration: underline;

    &:hover {
      color: lighten($black, 25%);
    }
  }

  &__left {
    margin-bottom: 15px;
  }

  &__middle {
    &__image {
      max-height: 60px;
      margin-bottom: 15px;
    }
  }
}
</style>
