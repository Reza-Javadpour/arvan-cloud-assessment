<template>
  <div class="panel-layout">
    <MainHeader :username="username" @logout="handleLogout()" />
    <div class="layout-content container-fluid">
      <div class="row">
        <MainSidebar :username="username" @logout="handleLogout()" />

        <main
          role="main"
          class="router-view-wrapper col-md-9 ml-sm-auto col-lg-10 px-md-4"
        >
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { getUsername } from '../core/storage.js';
import { doLogout, isLoggedIn } from '../core/auth.js';
import MainHeader from './partials/MainHeader.vue';
import MainSidebar from './partials/MainSidebar.vue';

export default {
  name: 'PanelLayout',
  components: { MainHeader, MainSidebar },
  data() {
    return {
      username: getUsername() || '',
    };
  },
  beforeMount() {
    if (!isLoggedIn()) {
      this.$router.push('/auth/login');
    }
  },
  methods: {
    handleLogout() {
      doLogout();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables';

.panel-layout {
  min-height: 100vh;
  .layout-content {
    overflow: hidden;
    height: calc(100vh - $navbar-height);
    .router-view-wrapper {
      padding: 0 30px 73px;
      overflow-y: scroll;
      height: calc(100vh - $navbar-height);
    }
  }
}
</style>
