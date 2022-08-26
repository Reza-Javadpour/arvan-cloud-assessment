<template>
  <div class="auth-box">
    <h1>{{ types[boxType].title }}</h1>
    <div class="form-items">
      <slot></slot>
    </div>
    <button
        type="submit"
        class="action-button btn btn-primary btn-block">
      {{ types[boxType].actionTitle }}
    </button>
    <div class="footer">
      <div class="footer-desc">{{ types[boxType].footerDesc }}</div>
      <router-link
          :to="types[boxType].footerActionRoute"
          class="footer-action">
        {{ types[boxType].footerActionTitle }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * AuthBox Component
   * @property {'login' | 'register'} boxType render dynamically based on box type
   */
  name: 'AuthBox',
  data() {
    return {
      types: {
        login: {
          title: 'LOGIN',
          actionTitle: 'Login',
          footerDesc: 'Don’t have account?',
          footerActionTitle: 'Register Now',
          footerActionRoute: '/auth/register'
        },
        register: {
          title: 'REGISTER',
          actionTitle: 'Register',
          footerDesc: 'Already Registered?',
          footerActionTitle: 'Login',
          footerActionRoute: '/auth/login'
        }
      }
    }
  },
  props: {
    boxType: {
      required: true,
      type: String
    }
  },
};
</script>

<style lang="scss" scoped>
  .auth-box {
    width: 100%;
    display: flex;
    max-width: 450px;
    border-radius: 4px;
    align-items: center;
    flex-direction: column;
    padding: 0px 20px 19px;
    justify-content: center;
    background-color: #eceeef;
    > h1 {
      color: #707070;
      margin-top: 37px;
      font-weight: 300;
      font-size: 2.938rem;
      margin-bottom: 27px;
      text-transform: uppercase;
    }
    > .form-items {
      width: 100%;
    }
    > .action-button {
      margin-top: 28px;
    }
    > .footer {
      width: 100%;
      display: flex;
      margin-top: 15px;
      .footer-desc {

      }
      .footer-action {
        font-weight: 700;
        margin-left: 11px;
      }
    }
  }
</style>
