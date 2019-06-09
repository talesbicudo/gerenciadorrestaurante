<template>
    <div class="pages">
      <div class="pages__wrapper">
          <section 
          :class="isSelected('orders-list')" 
          class="pages__page pages__page--container-order">
              <container-order/>
          </section>
          <section 
          :class="isSelected('order-detail')" 
          class="pages__page pages__page--details-order">
              <DetailsOrder/>
          </section>
        </div>
    </div>
</template>

<script>
import PAGE from "@/types/MobilePage";
import ContainerOrder from "./ContainerOrder";
import DetailsOrder from "@/components/DetailsOrder";

const typeMap = {
  "orders-list": PAGE.ORDER_SELECT,
  "order-detail": PAGE.ORDER_DETAILS
};

export default {
  components: { ContainerOrder, DetailsOrder },
  methods: {
    isSelected(type) {
      return typeMap[type] === this.$store.state.mobilePage.type
        ? "pages__page--selected"
        : "";
    }
  }
};
</script>

<style lang="scss">
.pages {
  overflow-x: hidden;
  &__wrapper {
    width: 200%;
    @include clearfix;
    @include respond(tab-land) {
      width: 100%;
      display: flex;
    }
  }
  &__page {
    width: 50%;
    float: left;
    position: relative;
    transition: transform #{$page-transition-time};

    &--details-order,
    &--container-order#{&}--selected {
      transform: translateX(0);
    }
     
    &--container-order,
    &--details-order#{&}--selected {
      transform: translateX(-100%);
    }
     
    @include respond(tab-land) {
      transform: translateX(0);
      &--details-order#{&}--selected {
        transform: translate(0);
      }
      &--container-order {
        width: 60%;
      }
      &--details-order {
        flex-grow: 1;
      }
    }
  }
}
</style>
