<template>
      <!-- TradingVueJs 101 (example from 'Getting Started' ) -->
      <trading-vue :data="chart" :width="this.width" :height="this.height"
                   :color-back="colors.colorBack"
                   :color-grid="colors.colorGrid"
                   :color-text="colors.colorText">
      </trading-vue>
</template>

<script>
      import TradingVue from 'trading-vue-js'
      import Data from '../../../static-data/data.json'

      export default {
            name: 'app',
            components: {TradingVue},
            methods: {
                  onResize() {
                        this.width = window.innerWidth;
                        this.height = this.getHeight();
                  },
                  getHeight() {
                        //return window.innerHeight - 100 - 76;  // 100 is tied to footer; 76 seems to be hdr 56 +20 padding?
                        return window.innerHeight - this.footer.offsetHeight - this.outerHeight(this.navbar)
                  },
                  /**
                   * Returns the element height including margins
                   * @param element - element
                   * @returns {number}
                   */
                  outerHeight(element) {
                        const height = element.offsetHeight,
                                style = window.getComputedStyle(element);

                        return ['top', 'bottom']
                                .map(side => parseInt(style[`margin-${side}`]))
                                .reduce((total, side) => total + side, height)
                  },
            },
            mounted() {
                  window.addEventListener('resize', this.onResize);
                  this.navbar = document.getElementById('navbar-container');
                  this.footer =  document.getElementById('footer-main');
                  this.height = this.getHeight();
            },
            beforeDestroy() {
                  window.removeEventListener('resize', this.onResize)
            },
            data() {
                  return {
                        chart: Data,
                        width: window.innerWidth,
                        height: 0,
                        colors: {
                              colorBack: '#fff',
                              colorGrid: '#eee',
                              colorText: '#333',
                        }
                  }
            }
      };
</script>
<style>
      section#chart-view {
            background-color: #000;
            margin: 0;
            padding: 0;
            overflow: hidden;
            height: 100%;
            width: 100%;
      }
</style>

