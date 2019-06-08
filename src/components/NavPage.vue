<template>
    <div class="nav-page" :class="navPageDirClass">
       <slot>To</slot> 
    </div>
</template>

<script>
export default {
  props: {
    left: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    navPageDirClass() {
      if (this.left) return "nav-page--left";
      return "nav-page--right";
    }
  }
};
</script>

<style lang="scss">
.nav-page {
  $size: 10rem;
  position: absolute;
  @include hoverableBg($color-grey-dark);
  width: $size;
  height: $size;
  border-radius: 50%;
  top: 50%;
  transition: all .3s;
  &--right {
    right: 0;
    transform: translateX(50%);
  }
  &--left {
    left: 0;
    transform: translateX(-50%);
  }
}
</style>
