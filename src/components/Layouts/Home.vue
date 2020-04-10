<template>
  <section class="main-content">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="mb-4"><strong>Home</strong></h1>

          <div class="callout-panel">
            <p>
              This project is for charting the LEAN trading engine output.
            </p>
            <a
              href="https://www.quantconnect.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="@/assets/images/qc-logo-orig.png"
                alt="QC LEAN"
                class="img-fluid"
              />
            </a>
          </div>

          <p>
            Here will be a check to see if you are currently logged in and your
            user info:
          </p>

          <p v-if="user"><font-awesome-icon icon="user" fixed-width /> You: {{ user }}</p>
          <p v-else>Hmm, you are not logged in.</p>

          <p>
            <font-awesome-icon icon="info-circle" fixed-width /> This is a simple SPA built
            using Koa (2.x) as the backend and Vue (2.x) as the frontend. If
            you don't want to create an account you can just use
            <strong>demousername</strong> and <strong>demopassword</strong> to
            login.
          </p>

          <p>
            LEAN engine -
            <a href="https://github.com/QuantConnect/Lean"
              >https://github.com/QuantConnect/Lean</a
            ></p>

          <hr />

          <p>
            <a
              href="https://github.com/QuantConnect/Lean"
              target="_blank"
              class="d-inline-block mb-2"
              ><img
                src="https://img.shields.io/badge/LEAN--social.svg?style=social"
                alt=""
            /></a>

            &nbsp;

            <a
              href="https://raw.githubusercontent.com/QuantConnect/Lean/master/LICENSE"
              target="_blank"
              ><img
                src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"
                alt=""
            /></a>

            &nbsp;

            <a
              href="https://github.com/QuantConnect/Lean/stargazers"
              target="_blank"
              ><img
                src="https://img.shields.io/github/stars/QuantConnect/Lean.svg"
                alt=""
            /></a>

            &nbsp;

            <a
              href="https://github.com/QuantConnect/Lean/network"
              target="_blank"
              ><img
                src="https://img.shields.io/github/forks/QuantConnect/Lean.svg"
                alt=""
            /></a>

            &nbsp;
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "home",
  computed: {
    ...mapGetters({
      user: "user/user"
    })
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/components/_variables.scss";

.callout-panel {
  a {
    display: inline-block;
  }

  img {
    max-height: 300px;
    display: block;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px 0 rgba(17, 51, 83, 0.18);
    transition: box-shadow 0.2s ease-in;
    border-radius: 4px;

    &:hover {
      box-shadow: 0 3px 5px 0 rgba(17, 51, 83, 0.28);
    }
  }
}
</style>
