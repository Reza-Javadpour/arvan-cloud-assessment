<template>
  <div class="auth-layout">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout'
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
