<template>
  <div class="login-page">
    <AuthBox boxType="login" @submit="submitForm()" :isLoading="isLoading">
      <form>
        <div class="form-group">
          <label for="InputEmail">Email</label>
          <input
            type="text"
            class="form-control"
            id="InputEmail"
            v-model="email"
            :disabled="isLoading">
        </div>
        <div class="form-group">
          <label for="InputPassword">Password</label>
          <input
            type="password"
            class="form-control"
            id="InputPassword"
            v-model="password"
            :disabled="isLoading">
        </div>
      </form>
    </AuthBox>
  </div>
</template>

<script>
import AuthBox from './components/AuthBox.vue';
import authServices from '../../core/api/auth-services.js';
import { isEmail } from '../../core/utils.js';
import { setAuthInfo } from '../../core/storage.js';

export default {
  name: 'Login',
  components: {AuthBox},
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
    }
  },
  methods: {
    submitForm() {
      if (
          !this.isLoading &&
          this.email &&
          isEmail(this.email) &&
          this.password.length >= 8
      ) {
        this.isLoading = true;
        authServices.doLogin({
          email: this.email,
          password: this.password
        }).then(response => {
          if (response?.data?.user) {
            setAuthInfo(response.data.user);
            window.location.reload();
          }
        }, () => {
          this.isLoading = false;
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .login-page {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
