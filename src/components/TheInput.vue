<template>
    <div class="input">
        <input 
        :id="id"
        class="input__input"
        :placeholder="placeholder" 
        v-bind="inputProps"
        @input="$emit('input', $event.target.value)" 
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
    background-color: rgba($color-white, 0.5);
    border: none;
    border-bottom: 3px solid transparent;
    transition: all 0.3s;
    &:focus {
      outline: none;
      box-shadow: 0 1rem 2rem rgba($color-black, 0.1);
      border-bottom: 1px solid $color-blue;
    }
  }
  &__label {
    width: 100%;
    margin-top: 0.7rem;
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
