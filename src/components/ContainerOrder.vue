<template>
    <div class="order-container">
        <div class="order-container__loader" v-if="$apollo.loading"/>
        <ul v-else class="order-container__list">
           <li v-for="order in orders" 
           class="order-container__row" :key="order.id">
               <ContainerItemOrder v-bind="order"/>
           </li> 
        </ul>
    </div>    
</template>
<script>
import ContainerItemOrder from "./ContainerItemOrder";
import { OrderFragment } from "@/client/queries";
import { OrderLocalFragment } from "@/client/queries";
import gql from "graphql-tag";

export default {
  components: {
    ContainerItemOrder
  },
  props: {
    dayDate: {
      type: Date,
      default: () => new Date()
    }
  },
  apollo: {
    orders: {
      query: gql`
        query($dayDate: DateTime!) {
          orders: dayOrders(dayDate: $dayDate) {
            ...orderData
            ...localOrderData
          }
        }
        ${OrderFragment}
        ${OrderLocalFragment}
      `,
      variables(){return { dayDate: this.dayDate }}
    }
  }
};
</script>

<style lang="scss">
.order-container {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    list-style: none;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  &__row {
    width: 50%;
    height: auto;
    @include respond(tab-port) {
      width: 33.3333%;
    }
    @include respond(desktop) {
      width: 25%;
    }
  }
}
</style>
