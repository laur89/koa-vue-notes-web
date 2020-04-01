<template>
  <section class="main-content pb-5">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <!-- This is where the main content goes. -->
        <div class="col-md-6">
          <div v-if="!charts.length && completedFirstPass">
            Looks like no current nor historic algo charts are available.
          </div>

          <!--div class="chart-block">
            <div v-for="chart in charts" :key="chart.id" class="row">
              <div class="col-12">
                <div class="chart-block__chart" @click="openChart(chart)">
                  <h3>
                    <strong>{{ chart.id }}</strong>
                  </h3>
                  <p>type: {{ chart.type }}</p>
                  <p>started @ {{ chart.startedAt }}</p>
                  <p>running: {{ !!chart.running }}</p>
                </div>
              </div>
            </div>
          </div-->
          <div>
            <b-table
                    id="chartlist-table"
                    ref="chartlist"
                    :items="charts"
                    :fields="fields"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    hover
                    :dark="theme.lightOrDark === 'dark'"
                    :head-variant="theme.lightOrDark"
                    :table-variant="theme.lightOrDark"
                    selectable
                    :select-mode="selectMode"
                    @row-selected="onRowSelectedSingle"
                    primary-key="id"
                    responsive="sm"
                    striped
                    :tbody-tr-class="customAttrs"
                    :busy.sync="isBusy"
            ></b-table>
          </div>

          <button
            v-if="okToLoadMore"
            @click="loadAlgos"
            class="btn"
            :class="['btn-' + theme.btn.main]"
          >
            <font-awesome-icon icon="chevron-down" fixed-width />
            Load More
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters, mapState} from 'vuex';

export default {
  name: "account",
  data() {
    return {
      completedFirstPass: false,
      okToLoadMore: false,
      query: {
        sort: "",
        order: "desc",
        page: 0,
        limit: 20
      },
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'type', label: 'Type', sortable: true },
        { key: 'startedAt', label: 'Started At', sortable: true },
        { key: 'running', label: 'Running?', sortable: true }
      ],
      sortBy: 'startedAt',
      sortDesc: true,
      selectMode: 'single',
      isBusy: false
    };
  },
  methods: {
    async loadAlgos() {
      this.isBusy = true;

      try {
        const response = await this.$store.dispatch(
          "chart/getUserCharts",
          this.query
        );
        if (response.length === this.query.limit) {
          this.okToLoadMore = true;
          this.query.page += 1;
        } else {
          this.okToLoadMore = false;
        }
      } catch (error) {
        this.$toasted.error("There was an error connecting to the server.");
      } finally {
        if (this.completedFirstPass === false) {
          this.completedFirstPass = true;
        }

        this.isBusy = false;
      }
    },
    openChart(chart) {
      this.$router.push({
        name: "openChart",
        query: { id: chart.id }
      });
    },
    onRowSelectedSingle(items) {
      if (!Array.isArray(items) || !items.length) return
      this.$refs.chartlist.clearSelected();  // unselect the chart row, otherwise on history.back() it'll still be selected when/if our view is cached
      this.openChart(items[0]);
    },
    customAttrs(item, type) {
      if (type !== 'row' || !item) return;
      if (item.running) return ['table-success', 'text-dark']
    },
  },
  computed: {
    ...mapGetters({
      user: "user/user",
      charts: "chart/charts"
    }),
    ...mapState({
      theme: state => state.common.theme,
    }),
  },
  created() {
    this.loadAlgos();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/components/_variables.scss";

/*.chart-block {
  &__chart {
    //background: lighten($light-grey, 2%);
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 20px;
    border: 1px solid $grey;

    &:hover {
      cursor: pointer;  // draw the hand icon to simulate btn UX
      opacity: 0.8;
    }
  }
}*/
</style>
