<template>
    <div class="input">
        <input 
        :id="id"
        class="input__input input--default"
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
    default: {
      type: String,
      default: ""
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
      value: this.default
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
