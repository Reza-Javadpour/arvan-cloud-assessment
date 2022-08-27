<template>
  <div class="register-page">
    <AuthBox box-type="register" :is-loading="isLoading" @submit="submitForm()">
      <form>
        <div class="form-group">
          <label for="InputUser">User</label>
          <input
            id="InputUser"
            v-model="username"
            type="text"
            class="form-control"
            :disabled="isLoading"
          />
        </div>
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
import { isEmail } from '../../core/utils.js';
import authServices from '../../core/api/auth-services.js';
import { setAuthInfo } from '../../core/storage.js';

export default {
  name: 'Register',
  components: { AuthBox },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      isLoading: false,
    };
  },
  methods: {
    submitForm() {
      if (
        !this.isLoading &&
        this.username.length >= 6 &&
        this.email &&
        isEmail(this.email) &&
        this.password.length >= 8
      ) {
        this.isLoading = true;
        authServices
          .doRegister({
            username: this.username,
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
.register-page {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
