<template>
  <div class="register-page">
    <AuthBox boxType="register">
      <form>
        <div class="form-group">
          <label for="InputUser">User</label>
          <input type="text" class="form-control" id="InputUser">
        </div>
        <div class="form-group">
          <label for="InputEmail">Email</label>
          <input type="text" class="form-control" id="InputEmail">
        </div>
        <div class="form-group">
          <label for="InputPassword">Password</label>
          <input type="password" class="form-control" id="InputPassword">
        </div>
      </form>
    </AuthBox>
  </div>
</template>

<script>
import AuthBox from './components/AuthBox.vue';

export default {
  name: 'Register',
  components: {AuthBox},
};
</script>

<style lang="scss" scoped>
  .register-page {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
