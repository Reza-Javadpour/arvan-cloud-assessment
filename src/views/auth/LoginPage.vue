<template>
  <div class="login-page">
    <AuthBox box-type="login" :is-loading="isLoading" @submit="submitForm()">
      <form>
        <div class="form-group">
          <label for="InputEmail">Email</label>
          <input
            id="InputEmail"
            v-model="email"
            type="text"
            class="form-control"
            :disabled="isLoading"
          />
        </div>
        <div class="form-group">
          <label for="InputPassword">Password</label>
          <input
            id="InputPassword"
            v-model="password"
            type="password"
            class="form-control"
            :disabled="isLoading"
          />
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
  name: 'LoginPage',
  components: { AuthBox },
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
    };
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
        authServices
          .doLogin({
            email: this.email,
            password: this.password,
          })
          .then(
            (response) => {
              if (response?.data?.user) {
                setAuthInfo(response.data.user);
                window.location.reload();
              }
            },
            () => {
              this.isLoading = false;
            },
          );
      }
    },
  },
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
