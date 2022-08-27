<template>
  <div :class="{ 'auth-box': true, disabled: isLoading }">
    <h1>{{ types[boxType].title }}</h1>
    <div class="form-items">
      <slot></slot>
    </div>
    <button
      class="action-button btn btn-primary btn-block"
      :disabled="isLoading"
      @click="$emit('submit')"
    >
      <Spinner v-if="isLoading" color="white" size="20px" />
      <span v-else>{{ types[boxType].actionTitle }}</span>
    </button>
    <div class="footer">
      <div class="footer-desc">{{ types[boxType].footerDesc }}</div>
      <router-link :to="types[boxType].footerActionRoute" class="footer-action">
        {{ types[boxType].footerActionTitle }}
      </router-link>
    </div>
  </div>
</template>

<script>
import Spinner from '../../../components/Spinner.vue';

export default {
  /**
   * AuthBox Component
   * @property {'login' | 'register'} boxType render dynamically based on box type
   */
  name: 'AuthBox',
  components: { Spinner },
  props: {
    boxType: {
      required: true,
      type: String,
    },
    isLoading: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      types: {
        login: {
          title: 'LOGIN',
          actionTitle: 'Login',
          footerDesc: 'Don’t have account?',
          footerActionTitle: 'Register Now',
          footerActionRoute: '/auth/register',
        },
        register: {
          title: 'REGISTER',
          actionTitle: 'Register',
          footerDesc: 'Already Registered?',
          footerActionTitle: 'Login',
          footerActionRoute: '/auth/login',
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.auth-box {
  width: 100%;
  display: flex;
  max-width: 450px;
  transition: 0.3s;
  border-radius: 4px;
  align-items: center;
  padding: 0 20px 19px;
  flex-direction: column;
  justify-content: center;
  background-color: #eceeef;
  &.disabled {
    opacity: 0.5;
  }
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
    height: 40px;
    display: flex;
    margin-top: 28px;
    align-items: center;
    justify-content: center;
  }
  > .footer {
    width: 100%;
    display: flex;
    margin-top: 15px;
    .footer-action {
      font-weight: 700;
      margin-left: 11px;
    }
  }
}
</style>
