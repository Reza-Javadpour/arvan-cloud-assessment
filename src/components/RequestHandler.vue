<template>
  <div
    v-if="isLoading"
    :class="`handler-wrapper size-${size}`"
    :style="{ height: containerHeight }"
  >
    <Spinner :size="spinnerSize" />
  </div>

  <div
    v-if="!isLoading && hasError"
    :class="`handler-wrapper size-${size}`"
    :style="{ height: containerHeight }"
  >
    <div class="description">{{ errorDesc }}</div>
    <div class="action">
      <button class="btn btn-outline-primary" @click="$emit('actionClick')">
        {{ actionTitle }}
      </button>
    </div>
  </div>

  <div
    v-if="!isLoading && !hasError"
    :class="`handler-wrapper size-${size} ${hasBorder ? 'has-border' : ''}`"
    :style="{ height: containerHeight }"
  >
    <p>No data</p>
  </div>
</template>

<script>
import Spinner from './Spinner.vue';

export default {
  name: 'RequestHandler',
  components: { Spinner },
  props: {
    errorDesc: { default: 'Server connection problem!', type: String },
    actionTitle: { default: 'Try again', type: String },
    size: { default: 'normal', type: String },
    containerHeight: { default: 'unset', type: String },
    hasBorder: { default: true, type: Boolean },
    isLoading: { default: false, type: Boolean },
    hasError: { default: false, type: Boolean },
    spinnerSize: { default: '40px', type: String },
  },
  emits: ['actionClick'],
};
</script>

<style lang="scss" scoped>
@import './src/assets/styles/variables';
.handler-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  > .description {
    opacity: 0.7;
    font-size: 1.5rem;
  }
  > .action {
    color: $primary-color;
    margin-top: 30px;
  }

  &.size-small {
    > .description {
      font-size: 20px;
    }
    > .action {
      margin-top: 10px;
    }
  }
  &.has-border {
    border-radius: 8px;
    justify-content: center;
    border: dashed 1px $primary-color;
  }
}
</style>
