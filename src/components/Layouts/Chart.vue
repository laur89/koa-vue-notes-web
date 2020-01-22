<template>
      <!-- This tmpl based on TradingVueJs 101 (example from 'Getting Started' ) -->
      <trading-vue ref="tradingVue"
                   :data="chart" :width="this.width" :height="this.height"
                   :color-back="colors.colorBack"
                   :color-grid="colors.colorGrid"
                   :color-text="colors.colorText"
                   :title-txt="this.chartName"
      >
      </trading-vue>
</template>

<script>
      import {TradingVue, DataCube} from 'trading-vue-js';
      import _ from 'lodash';
      //import Data from '../../../static-data/data.json'

      /**
       * Returns the element height including margins
       *
       * TODO: move out to utils class
       * @param element - element
       * @returns {number}
       */
      const outerHeight = element => {
            const height = element.offsetHeight,
                    style = window.getComputedStyle(element);

            return ['top', 'bottom']
                    .map(side => parseInt(style[`margin-${side}`]))
                    .reduce((total, side) => total + side, height)
      };

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
                        return window.innerHeight - this.footer.offsetHeight - outerHeight(this.navbar)
                  },
                  notify(msg) {
                        this.$toasted.show(msg,  {
                              theme: "toasted-primary",
                              position: "top-right",
                              //icon: 'check',
                              duration : 5000
                        });
                  },
                  async getTail() {
                        try {
                              return await this.$store.dispatch(
                                      'chart/getChartTail',
                                      {
                                            id: this.algoId,
                                            span: 6000 * 1000 // TODO find a way to define
                                      }
                              );
                        } catch (error) {
                              this.$toasted.error("There was an error connecting to the server.");
                        }
                  },
                  async getSlice(start, end) {
                        try {
                              return await this.$store.dispatch(
                                      'chart/getChartSlice',
                                      {
                                            id: this.algoId,
                                            start,
                                            end
                                      }
                              );
                        } catch (error) {
                              this.$toasted.error("There was an error connecting to the server.");
                        }
                  },
                  clickButton(data) {
                        // $socket is socket.io-client instance
                        this.$socket.emit('emit_method', data)
                  }
                  //sub: function (chartId) {
                        // $socket is socket.io-client instance
                        //this.$socket.on(chartId, data => {
                                      //console.log(`GOT DATA: ${JSON.stringify(data.chart)}`);

                                      //this.chartName = data.chartName;
                                      //this.$set(this, 'chart', data.chart);
                              //const latestTime = data.chart.chart.data[data.chart.chart.data.length - 1][0];
                              //this.$refs.tradingVue.goto(latestTime);
                              //console.log(i)
                              //this.$emit('scroll-lock', true)
                                      //});

                        // subscribe us to $chartId events:
                        //      this.$socket.emit('sub_chart', chartId)
                  //}
            },
            // all keys under here will be topics we subscribe to (and will be automatically unsubscribed on unmount):
            sockets: {
                  // note connect is also filed on re-connections, so do not subscribe to rooms/events in here!
                  connect() {
                        console.log('socket connected');
                        this.notify('socket connected')
                  },
                  chart(data_) {
                        this.notify('chart update via SOCK');

                        // received update for main chart:
                        // TODO: do we have/want to call .set() on very first init, or can go with merge()? note no add() for 'chart';
                        //data.{id,meta,data}

                        const {data, conf} = data_;

                        // TODO: where do we set chart type??

                        this.chartName = conf.chartName;
                        //console.log(JSON.stringify(this.dc.data));
                        if (_.isEmpty(this.dc.data.chart.settings)) {
                              this.dc.set('chart.settings', conf.settings);
                              this.dc.data.chart.type = conf.type;  // assuming type won't change later on
                              //console.log('kek YESSS' + JSON.stringify(conf));
                        } else {
                              this.dc.merge('chart.settings', conf.settings);
                              //
                              // console.log('kekNO ' + JSON.stringify(conf));
                        }

                        this.dc.merge('chart.data', data);  // TODO: DC should start truncating ends on merge


                        //const latestTime = data.chart.chart.data[data.chart.chart.data.length - 1][0];
                        //this.$refs.tradingVue.goto(latestTime);
                        //console.log(i)
                        //this.$emit('scroll-lock', true)
                  },
                  onchart(data_) {
                        this.notify('onchart update via SOCK');

                        // received update for main chart:
                        // TODO: do we have/want to call .set() on very first init, or can go with merge()? note no add() for 'chart';
                        //data.{id,meta,data}

                        const {/*id,*/ data, meta} = data_;
                        console.log(JSON.stringify(this.dc.data));
                        if (_.isEmpty(this.dc.data.chart.settings)) {
                              this.dc.set('chart.settings', meta);
                              console.log('kek YESSS' + JSON.stringify(meta));
                        } else {
                              this.dc.merge('chart.settings', meta);
                              console.log('kekNO ' + JSON.stringify(meta));
                        }
                        this.dc.merge('chart.data', data);
                  }
                  //offchart(data_) {
            },
            mounted() {
                  this.notify('we are mounted');

                  this.navbar = document.getElementById('navbar-container');
                  this.footer = document.getElementById('footer-main');
                  this.algoId = this.$route.query.id;  // store it as $routes might not see query params on beforeDestroy()

                  this.onResize();
                  window.addEventListener('resize', this.onResize);

                  this.getTail().then(result => {
                        result  || this.notify('!!falsy tail received');
                        this.notify(`!!tail received, keys: ${Object.keys(result)}`);

                        this.chartName = result.chart.chartName;
                        delete result.chart.chartName;

                        this.dc.set('chart', result.chart);
                        this.dc.set('onchart', result.onchart);
                        this.dc.set('offchart', result.offchart);


                        // TODO: pass last fetched element back to sub_chart in case something got emitted between our response was compiled and when we subed?:
                        this.$socket.emit('sub_chart', this.algoId);
                  });
            },
            beforeDestroy() {
                  this.$socket.emit('unsub_chart', this.algoId);
                  window.removeEventListener('resize', this.onResize);

                  // note this is an example of manually managing subscription-unsubscription:
                  //this.sockets.unsubscribe(chartId);
            },
            data() {
                  this.dc = new DataCube({
                        chart: {
                              name: 'myassetchart',
                              data: []
                        },
                        onchart: [],
                        offchart: []
                  });
                  return {
                        chart: this.dc,
                        chartName: 'Waiting for downlink...',
                        //chart: Data,
                        width: window.innerWidth,
                        height: 0,
                        colors: {
                              colorBack: '#fff',
                              colorGrid: '#eee',
                              colorText: '#333',
                        }
                  };
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

