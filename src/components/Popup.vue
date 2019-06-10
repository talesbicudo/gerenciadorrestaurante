<template>
    <div @click.self="close" class="popup" :class="activeClass">
        <div class="popup__content">
           <component v-if="selectedChild" :is="selectedChild"/>
        </div>
    </div>    
</template>

<script>
import POPUP from "@/types/Popup";
import FormAddPayment from "./FormAddPayment";
import FormAddItem from "./FormAddItem";

const componentByType = {
  [POPUP.PAYMENT_ADD]: FormAddPayment,
  [POPUP.ITEM_ADD]: FormAddItem
};

export default {
  components: { FormAddPayment, FormAddItem },
  computed: {
    type() {
      return this.$store.state.popup.type;
    },
    activeClass() {
      return this.type ? "popup--active" : "";
    },
    selectedChild() {
      return this.type ? componentByType[this.type] : null;
    }
  },
  methods: {
    close() {
      this.$store.commit("popupClose");
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
    width: 95%;
    background-color: $color-grey-light;
    box-shadow: 0 2rem 4rem rgba($color-black, 0.2);
    border-radius: 3px;
    display: table;
    overflow: hidden;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.25);
    transition: all 0.3s 0.1s;
    padding: 1rem 2rem;
    @include respond(tab-land) {
      width: 60%;
      padding: 2rem 4rem;
    }
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
