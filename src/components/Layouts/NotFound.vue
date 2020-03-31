<template>
  <div class="panel">
    <h1>Not Found</h1>
    <p>Hmm, we couldn't quite find what you were looking for.</p>
    <router-link to="/"
                 class="btn"
                 :class="['btn-' + theme.btn]">
    Go Home</router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "notFound",
  mounted() {},
  computed: {
    ...mapState({
      theme: state => state.common.theme,
    }),
  },
};
</script>

<style lang="sass" scoped></style>
