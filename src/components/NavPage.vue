<template>
    <div class="nav-page" :class="navPageDirClass" v-html="arrow">
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
    },
    arrow() {
        if(this.left) return "&larr;"
        return "&rarr;"
    }
  }
};
</script>

<style lang="scss">
.nav-page {
    $size: 4rem;
  position: absolute;
  top: 50%;
  transition: all .3s;
  font-size: $font-size-large;
  background-color: antiquewhite;
  width: $size;
  height: $size;
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
