<template>
    <div class="input">
        <input 
        :id="id"
        class="input__input"
        :placeholder="placeholder" 
        v-bind="inputProps"
        @input="$emit('input', value)" 
        v-model="value"
        autofocus
        >
        <button v-if="value" class="input__close" @click="emptyValue"><CloseIcon/></button>
    </div>
</template>

<script>
import CloseIcon from "vue-ionicons/dist/md-close";
export default {
  components: { CloseIcon },
  props: {
    id: {
      type: String,
      default: "input"
    },
    placeholder: {
      type: String,
      default: "placeholder"
    },
    inputProps: {
      type: Object,
      default: () => ({ type: "text" })
    }
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    emptyValue() {
      this.value = "";
      this.$emit("input", this.value);
    }
  }
};
</script>

<style lang="scss">
.input {
  $close-size: 3rem;
  $height: calc(#{$font-size-big} + 2rem);
  margin: auto;
  overflow: hidden;
  height: $height;
  &__input {
    overflow: hidden;
    display: inline-block;
    border-radius: 2px;
    width: 100%;
    font-size: $font-size-big;
    background-color: rgba($color-white, 0.9);
    border: solid $color-grey-dark 1px;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    &:focus {
      outline-offset: 0;
      outline: none;
      box-shadow: 0 1rem 2rem rgba($color-black, 0.1);
      border: none;
      border-bottom: 1px solid $color-blue;
    }
    width: calc(100% - #{$close-size});
  }
  &__close {
    display: inline-block;
    width: $close-size;
    font-size: $font-size-big;
    & svg {
      fill: $color-red;
      margin: auto;
      display: block;
    }
    & div {
      height: 2rem;
    }
  }
}
</style>
