<template>
    <div class="order-container">
        <TheInputSearch/> 
        <div class="order-container__loader" v-if="$apollo.loading"/>
        <ul v-else class="order-container__list">
           <li v-for="order in byUpdateOrder" 
           class="order-container__list-item" :key="order.id">
               <ContainerItemOrder v-bind="order"/>
           </li> 
        </ul>
    </div>    
</template>
<script>
import gql from "graphql-tag";
import _ from "lodash";
import ContainerItemOrder from "./ContainerItemOrder";
import TheInputSearch from '@/components/TheInputSearch';
import { OrderFragment } from "@/client/queries";
import { OrderLocalFragment } from "@/client/queries";

export default {
  components: {
    ContainerItemOrder,
    TheInputSearch
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
      variables() {
        return { dayDate: this.dayDate };
      }
    }
  },
  computed: {
    byUpdateOrder() {
      return [...this.orders].sort(
        (orderA, orderB) =>
          _.last(orderA.updates).date - _.last(orderB.updates).date
      ).reverse();
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
  &__list-item {
    width: 50%;
    height: auto;
    padding: 1rem 4rem;
    min-width: 10rem;
    max-width: 20rem;
    @include respond(tab-port) {
      width: 33.3333%;
    }
    @include respond(desktop) {
      width: 25%;
    }
  }
}
</style>
