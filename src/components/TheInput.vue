<template>
    <div class="input">
        <input 
        :id="id"
        class="input__input"
        :placeholder="placeholder" 
        v-bind="inputProps"
        @input="$emit('input', $event.target.value)" 
        autofocus
        >
        <label
        class="input__label"
        :for="id">{{placeholder}}
        </label>
    </div>
</template>

<script>
export default {
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
  }
};
</script>

<style lang="scss">
.input {
  margin: auto;
  display: block;
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
  }
  &__label {
    width: 100%;
    margin-top: 0.7rem;
    font-size: $font-size-big;
    display: block;
    transition: all 0.3s;
  }

  &__input:placeholder-shown + &__label {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4rem);
  }
}
</style>
