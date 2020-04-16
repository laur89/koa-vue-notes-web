<template>
  <div>
    <b-navbar id="navbar-container" toggleable="lg" class="navbar-section py-1"
              :class="[theme.hdr.shadow]"
              :variant="theme.hdr.variant"
              :fixed="theme.hdr.fixed"
              :type="theme.hdr.lightOrDark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand :to="{ name: 'home' }">
        <img v-if="theme.lightOrDark === 'dark'" src="@/assets/images/lean-logo-subtxt-grey-25.png" alt="Powered by QC Lean">
        <img v-else src="@/assets/images/lean-logo-subtxt-white-25.png" alt="Powered by QC Lean">
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav v-if="!user" class="mr-auto">
          <b-nav-item :to="{ name: 'login' }">
            Login
          </b-nav-item>

          <b-nav-item :to="{ name: 'signup' }">
            Signup
          </b-nav-item>

          <b-nav-item :to="{ name: 'forgot' }">
            Forgot
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-if="user" class="mr-auto">
          <b-nav-item :to="{ name: 'charts' }">
            Charts
          </b-nav-item>
          <b-nav-item :to="{ name: 'account' }">
            Account
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <!--li class="nav-item">
            <a
              href="https://koa-react-notes-web.innermonkdesign.com"
              class="navbar-text mr-sm-3"
              target="_blank"
              >Visit the React Version!</a
            >
          </li>
          <li class="nav-item">
            <a
              href="https://github.com/johndatserakis/koa-vue-notes-web"
              class="navbar-text mr-sm-3"
              target="_blank"
              >Web Code</a
            >
          </li>
          <li class="nav-item">
            <a
              href="https://github.com/johndatserakis/koa-vue-notes-api"
              class="navbar-text mr-sm-3"
              target="_blank"
              >API Code</a
            >
          </li>
          <li class="nav-item">
            <a
              href="https://github.com/johndatserakis/"
              class="navbar-text mr-sm-3"
              target="_blank"
              ><font-awesome-icon icon="user-cog" fixed-width />
            </a>
          </li-->

          <b-nav-item-dropdown v-if="user" id="user-cog-nav-dropdown" lazy right ref="userDropdown">
            <template slot="button-content"><font-awesome-icon icon="user-cog" fixed-width /></template>
            <b-dropdown-form>
              <b-form-checkbox v-model="toggleDarkMode" name="dark-mode-toggle" switch>
                Dark mode
              </b-form-checkbox>
            </b-dropdown-form>
            <b-dropdown-item>TODO foo</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div v-if="!chartVisible" id="header-spacing"></div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "navbar",
  data() {
    return {};
  },
  mounted() {
    /*
    this.$root.$on('bv::dropdown::show', bvEvent => {
      console.log('Dropdown is about to be shown', bvEvent)
    });
    this.$root.$on('bv::dropdown::hide', bvEvent => {
      console.log('Dropdown is about to be hidden', bvEvent);
      //bvEvent.preventDefault();
    });
   */
  },
  methods: {
    async logout() {
      // As you can see, with Vuex we we need to fire logout methods
      // for each of our modules.
      await this.$store.dispatch("user/userLogout");
      await this.$store.dispatch("note/userLogout");
      this.$router.push({ name: "home" });

      // After logging the user out we need to refresh the page
      // this is because some of our components initialize on their
      // created methods - and when a user logs out they need to be
      // fully cleared.
      // location.reload()
      document.location.href = '/';
    },
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
    ...mapState({
      theme: state => state.common.theme,
      chartVisible: state => state.common.chartVisible,
    }),
    toggleDarkMode: {  // consider https://github.com/maoberlehner/vuex-map-fields
      get() {
        return this.$store.state.common.darkModeEnabled;
      },
      set(isDark) {
        this.$store.commit('common/TOGGLE_THEME', isDark);
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/components/_variables.scss";

#header-spacing {
  height: 20px;
}

//This is for the full bleed background
//when using a container
#navbar-container {
  //background-color: $blue;  // controlled by 'variant' class
  //margin-bottom: 20px;  // now controlled dynamicaly

  .container-nav {
    padding-left: 0;
    padding-right: 90;
  }

  .navbar {
    margin-bottom: 20px;
  }
}

#user-cog-nav-dropdown {
  white-space: nowrap;  // don't allow text in items to wrap
}

// //When using fixed-top navbar, add this.
// .sticky-nav-spacer {
//     margin-top: 78px;
// }
</style>
