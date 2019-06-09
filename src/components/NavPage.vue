<template>
    <button @click="$emit('click')" class="nav-page" :class="navPageDirClass">
      <component :is="arrow"/>
    </button>
</template>

<script>
import ArrowF from "vue-ionicons/dist/md-arrow-forward";
import ArrowB from "vue-ionicons/dist/md-arrow-back";
export default {
  components: {
    ArrowF, ArrowB
  },
  props: {
    left: {
      type: Boolean,
      default: false
    },

  },
  computed: {
    navPageDirClass() {
      if (this.left) return "nav-page--left";
      return "nav-page--right";
    },
    arrow() {
      if (this.left) return ArrowB;
      return ArrowF;
    }
  }
};
</script>

<style lang="scss">
.nav-page {
  z-index: 200;
  $size: 4rem;
  position: absolute;
  top: 50%;
  transition: all 0.3s;
  font-size: $font-size-large;
  background-color: antiquewhite;
  width: $size;
  height: $size;
  &:hover {
    cursor: pointer;
  }
  &--right {
    right: 0;
    transform: translateX(-50%);
  }
  &--left {
    left: 0;
    transform: translateX(50%);
  }
}
</style>
