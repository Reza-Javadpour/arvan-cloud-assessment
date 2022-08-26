<template>
  <div class="auth-layout">
    <router-view></router-view>
  </div>
</template>

<script>

import { isLoggedIn } from '../core/auth.js';

export default {
  name: 'AuthLayout',
  beforeMount () {
    if (isLoggedIn()) {
      this.$router.push('/articles')
    }
  }
};
</script>

<style lang="scss" scoped>
  .auth-layout {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
  }
</style>
