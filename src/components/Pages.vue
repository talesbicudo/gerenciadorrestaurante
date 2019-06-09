<template>
    <div class="pages">
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
  &__page {
    width: 100%;
    left: 0;
    position: absolute;
    transition: transform #{$page-transition-time};

    &--details-order {
      transform: translateX(200%);
    }

    &--container-order {
      transform: translateX(-100%);
    }

    &--selected {
      transform: translateX(0);
    }

    @include respond(tab-land){
        position: relative;
        display: inline-block;
        transform: translateX(0);
        &--container-order {
            width: 40%;
        }
        &--details-order {
            width: 60%;
        }
    }
  }
}
</style>
