<template>
    <div class="popup" :class="activeClass">
        <div class="popup__content">
           <slot>Content</slot> 
        </div>
    </div>    
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    activeClass() {
      return this.active ? "popup--active" : "";
    }
  }
};
</script>

<style lang="scss">
.popup {
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba($color-black, 0.8);
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;

  &__content {
    @include absCenter;

    width: 75%;
    background-color: $color-white;
    box-shadow: 0 2rem 4rem rgba($color-black, 0.2);
    border-radius: 3px;
    display: table;
    overflow: hidden;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.25);
    transition: all 0.5s 0.2s;
  }

  @supports (-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px)) {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background-color: rgba($color-black, 0.3);
  }

  &--active {
    opacity: 1;
    visibility: visible;
  }

  &--active &__content {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

}
</style>
