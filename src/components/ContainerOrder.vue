<template>
    <div class="order-container">
        <TheInputSearch v-model="search"/> 
        <div class="order-container__loader" v-if="$apollo.loading"/>
        <ul v-else class="order-container__list">
           <li v-for="order in selectedOrders" 
           class="order-container__list-item" :key="order.id">
               <ContainerItemOrder :search="search" v-bind="order"/>
           </li> 
        </ul>
    </div>    
</template>
<script>
import gql from "graphql-tag";
import _ from "lodash";
import ContainerItemOrder from "./ContainerItemOrder";
import TheInputSearch from "@/components/TheInputSearch";
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
  data: function() {
    return {
      search: ""
    };
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
      return [...this.orders]
        .sort(
          (orderA, orderB) =>
            _.last(orderA.updates).date - _.last(orderB.updates).date
        )
        .reverse();
    },
    selectedOrders() {
      if (!this.search) return this.byUpdateOrder;
      return this.byUpdateOrder.filter(order => {
        const reg = new RegExp(String(this.search).toLowerCase());
        return order.searchTags.some(({ value }) => reg.test(String(value).toLowerCase()));
      });
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
    align-items: top;
    width: 100%;
    height: 100%;
  }
  &__list-item {
    width: 50%;
    height: auto;
    padding: 1rem 2rem;
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
