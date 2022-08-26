<template>
  <div
    class="spinner"
    :style="{
      'border-color': color,
      '--spinner-size': size
    }"
  ></div>
</template>

<script>
export default {
  name: 'Spinner',
  props: {
    size: {
      default: '30px',
      type: String,
    },
    color: {
      type: String,
      default: '#1c7cd5',
    },
  }
};
</script>

<style lang="scss" scoped>
  .spinner {
    border-radius: 50%;
    display: inline-block;
    border-top: solid 3px;
    border-left: solid 3px;
    border-bottom: solid 3px;
    width: var(--spinner-size);
    height: var(--spinner-size);
    border-right: solid 3px transparent !important;
    animation: rotate 1s infinite linear;
  }
  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
