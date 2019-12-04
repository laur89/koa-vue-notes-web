<template>
  <section class="main-content pb-5">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <!-- This is where the main content goes. -->
        <div class="col-md-6">
          <div v-if="!charts.length && completedFirstPass">
            Hmm, you don't have any charts.
          </div>

          <div class="note-block">
            <div v-for="chart in charts" :key="chart.id" class="row">
              <div class="col-12">
                <div class="chart-block__note" @click="viewChart(chart)">
                  <h3>
                    <strong>{{ chart.title }}</strong>
                  </h3>
                  <p>Chart ID: {{ chart.chartId }}</p>
                </div>
              </div>
            </div>
          </div>

          <button
            v-if="okToLoadMore"
            @click="loadCharts"
            class="btn btn-primary"
          >
            <i class="fa fa-chevron-down fa-fw"></i>
            Load More
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "charts",
  data() {
    return {
      completedFirstPass: false,
      okToLoadMore: false,
      query: {
        sort: "",
        order: "desc",
        page: 0,
        limit: 20
      }
    };
  },
  methods: {
    async loadCharts() {
      try {
        const response = await this.$store.dispatch(
          "chart/getUserCharts",
          this.query
        );
        if (response.length === this.query.limit) {
          this.okToLoadMore = true;
          this.query.page = this.query.page + 1;
        } else {
          this.okToLoadMore = false;
        }
      } catch (error) {
        this.$toasted.error("There was an error connecting to the server.");
      } finally {
        if (this.completedFirstPass === false) {
          this.completedFirstPass = true;
        }
      }
    },
    editChart(chart) {
      let i = this.charts.map(chart => chart.id).indexOf(chart.id);
      this.$router.push({
        name: "editChart",
        query: { id: this.charts[i].id }
      });
    }
  },
  computed: {
    ...mapGetters({
      user: "user/user",
      charts: "chart/charts"
    })
  },
  created() {
    this.loadCharts();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/components/_variables.scss";

.chart-block {
  &__chart {
    background: lighten($light-grey, 2%);
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 20px;
    border: 1px solid $grey;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
}
</style>
