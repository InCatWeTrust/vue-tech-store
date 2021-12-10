<template>
<transition name="preload">
  <div
  class="preloader-wrapper"
  :style="`background-color: ${background}; min-height: ${minHeight}px;`"
  >
    <div
    class="preloader"
    :style="`height: ${size}px; width: ${size}px;`"
    >
      <div :style="`margin: ${size / 10}px; border: ${size / 10}px solid ${background};`"></div>
      <div :style="`margin: ${size / 10}px; border: ${size / 10}px solid ${background};`"></div>
      <div :style="`margin: ${size / 10}px; border: ${size / 10}px solid ${background};`"></div>
      <div :style="`margin: ${size / 10}px; border: ${size / 10}px solid ${background};`"></div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'Preloader',
  props: [
    'backgroundColor',
    'minHeight',
    'preloaderSize',
  ],
  computed: {
    background() {
      return this.backgroundColor ? this.backgroundColor : '#fff';
    },
    height() {
      return this.minHeight ? this.minHeight : '';
    },
    size() {
      return this.preloaderSize ? this.preloaderSize : 80;
    },
  },
};
</script>

<style lang="scss">
$loader-duration: 1.2s;
$loader-iteration-count: infinite;
$loader-direction: normal;

.preloader-wrapper{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 50;
}

.preloader {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  position: absolute;
}

.preloader div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 80%;
  height: 80%;
  margin: 8px;
  border-radius: 50%;
  animation: rotation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #222 transparent transparent transparent !important;
}

.preloader div:nth-child(1) {
  animation-delay: -0.45s;
}

.preloader div:nth-child(2) {
  animation-delay: -0.3s;
}

.preloader div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// .preload-enter-active {
//   transition-property: opacity;
//   transition-duration: 100ms;
// }

.preload-leave-active {
  transition-property: opacity;
  transition-duration: 300ms;
  transition-delay: 300ms;
  transition-timing-function: ease;
}
.preload-enter, .preload-leave-to {
  opacity: 0;
}
</style>
