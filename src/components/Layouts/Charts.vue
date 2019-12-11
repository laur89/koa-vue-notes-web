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
            name: 'charts',
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
                   *
                   * TODO: move out to utils class
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
            // all keys under here will be topics we subscribe to (and will be automatically unsubscribed on unmount):
            sockets: {
                  connect: function () {
                        console.log('socket connected')
                  },
                  customEmit: function (/*data*/) {
                        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
                  },
                  newsTopic: function (data) {
                        console.log('this method was fired by the socket server. eg: io.emit("newsTopic", data)' + data)
                  }
            },
            mounted() {
                  window.addEventListener('resize', this.onResize);

                  // note this is an example of manually managing subscription-unsubscription:
                  this.sockets.subscribe('EVENT_NAME', data => {
                        console.log('this method was fired by the socket server. eg: io.emit("EVENT_NAME", data)' + data);
                        this.msg = data.message;
                  });

                  this.navbar = document.getElementById('navbar-container');
                  this.footer = document.getElementById('footer-main');
                  this.height = this.getHeight();
            },
            beforeDestroy() {
                  window.removeEventListener('resize', this.onResize);

                  // note this is an example of manually managing subscription-unsubscription:
                  this.sockets.unsubscribe('EVENT_NAME');
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

