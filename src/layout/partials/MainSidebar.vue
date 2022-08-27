<template>
  <nav
    id="sidebarMenu"
    class="col-md-3 col-lg-2 pl-0 pr-0 d-md-block text-light sidebar collapse"
  >
    <div class="sidebar-sticky p-0">
      <div class="greeting-text mt-4 ml-3 d-sm-none">
        {{ `Welcome ${username}` }}
      </div>
      <h4
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1"
      >
        <span>Posts</span>
      </h4>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link class="nav-link pl-5" to="/articles">
            All Articles
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link pl-5" to="/article/new">
            New Article
          </router-link>
        </li>
      </ul>
      <button
        type="button"
        class="btn btn-primary btn-block d-sm-none mt-4 mb-4"
        @click="$emit('logout')"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MainSidebar',
  props: {
    username: {
      default: '',
      type: String,
    },
  },
  emits: ['logout'],
};
</script>

<style lang="scss" scoped>
@import './src/assets/styles/variables';
#sidebarMenu {
  background-color: $primary-color;
  .nav-item {
    > a.active {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
}
</style>
