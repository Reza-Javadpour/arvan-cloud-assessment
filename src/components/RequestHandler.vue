<template>
  <div
      v-if="isLoading"
      :class="`handler-wrapper size-${size}`"
      :style="{'height': containerHeight}"
  >
    <Spinner :size="spinnerSize" />
  </div>

  <div
      v-if="!isLoading && hasError"
      :class="`handler-wrapper size-${size}`"
      :style="{'height': containerHeight}"
  >
    <div class="description">{{errorDesc}}</div>
    <div class="action">
      <button class="btn btn-outline-primary" @click="this.$emit('actionClick')">
        {{actionTitle}}
      </Button>
    </div>
  </div>

  <div
      v-if="!isLoading && !hasError"
      :class="`handler-wrapper size-${size} ${hasBorder ? 'has-border' : ''}`"
      :style="{'height': containerHeight}"
  >
    <p>No data</p>
  </div>
</template>

<script>
import Spinner from './Spinner.vue';
export default {
  name: 'RequestHandler',
  components: {Spinner},
  props: {
    errorDesc: {default: 'Server connection problem!'},
    actionTitle: {default: 'Try again'},
    size: {default: 'normal'},
    containerHeight: {default: 'unset'},
    hasBorder: {default: true},
    isLoading: {default: false},
    hasError: {default: false},
    spinnerSize: {default: '40px'},
  }
};
</script>

<style lang="scss" scoped>
  .handler-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    > .content {
      color: #fff;
    }
    > .description {
      opacity: 0.7;
      font-size: 1.5rem;
    }
    > .action {
      color: #610ce9;
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
      border-radius: 28px;
      justify-content: center;
      border: dashed 1px #7124ff99;
    }
  }
</style>
