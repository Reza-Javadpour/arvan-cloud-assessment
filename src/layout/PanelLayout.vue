<template>
  <div class="panel-layout">
    <nav class="navbar navbar-dark sticky-top pl-3 bg-dark shadow">
      <router-link class="navbar-brand ml-3 pl-5 pl-md-0" to="/">Arvan Challenge</router-link>
      <div class="greeting-text ml-4 d-none d-sm-block">Welcome [username]</div>
      <button type="button" class="btn btn-outline-info d-none d-sm-block">Logout</button>
      <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse"
              data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
    <div class="layout-content container-fluid">
      <div class="row">
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block text-light sidebar collapse">
          <div class="sidebar-sticky p-0">
            <div class="greeting-text mt-4 ml-3 d-sm-none">Welcome [username]</div>
            <h4 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
              <span>Posts</span>
            </h4>
            <ul class="nav flex-column">
              <li class="nav-item ml-4">
                <router-link class="nav-link" to="/articles">
                  All Articles
                </router-link>
              </li>
              <li class="nav-item ml-4">
                <router-link class="nav-link" to="/articles/new">
                  New Article
                </router-link>
              </li>
            </ul>
            <button type="button" class="btn btn-primary btn-block d-sm-none mt-4 mb-4">Logout</button>
          </div>
        </nav>

        <main role="main" class="router-view-wrapper col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelLayout',
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.panel-layout {
  min-height: 100vh;

  .navbar {
    height: $navbar-height;

    .greeting-text {
      margin-right: auto;
      color: $secondary-text-color;
    }
  }

  #sidebarMenu {
    background-color: $primary-color;
  }

  .layout-content {
    overflow: hidden;
    height: calc(100vh - $navbar-height);

    .router-view-wrapper {
      overflow-y: scroll;
      height: calc(100vh - $navbar-height);
    }
  }
}
</style>
