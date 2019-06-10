<template>
    <div class="input">
        <input 
        :id="id"
        class="input__input"
        :placeholder="placeholder" 
        v-bind="inputProps"
        @input="$emit('input', $event.target.value)" 
        v-model="value"
        autofocus
        >
        <button class="input__close" @click="emptyValue"><CloseIcon/></button>
    </div>
</template>

<script>

import CloseIcon from "vue-ionicons/dist/md-close";
export default {
  components: {CloseIcon},
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
  data(){
    return {
      value: ""
    }
  },
  methods: {
    emptyValue(){
      this.value = "";
    }
  }
};
</script>

<style lang="scss">
.input {
  $close-size: 3rem;
  margin: auto;
  display: block;
  @include clearfix;
  &__input {
    border-radius: 2px;
    width: 100%;
    font-size: $font-size-big;
    background-color: rgba($color-white, 0.9);
    border: solid $color-grey-dark 1px;
    padding: .2rem .4rem;
    border-radius: 3px;
    &:focus {
      outline: none;
      box-shadow: 0 1rem 2rem rgba($color-black, 0.1);
      border: none;
      border-bottom: 1px solid $color-blue;
    }
    float: left;
    width: calc(100% - #{$close-size})
  }
  &__close {
    float: left;
    font-size: $font-size-big;
    width: $close-size;
  }
}
</style>
