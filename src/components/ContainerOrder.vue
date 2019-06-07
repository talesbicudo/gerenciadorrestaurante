<template>
    <div class="order-container">
        <div class="order-container__search-inputs">
          <input type="number"
            class="order-container__table-search"
            min="0"
            :max="lastNumberTable"
            step="1"
           >
          <input type="search" class="order-container__tag-search" placeholder="procurar" v-model="search"> 
        </div>
        <div class="order-container__loader" v-if="$apollo.loading"/>
        <ul v-else class="order-container__list">
           <li v-for="order in selectedOrders" 
           class="order-container__list-item" :key="order.id">
               <ContainerItemOrder :search="lowerCaseSearch" v-bind="order"/>
           </li> 
        </ul>
    </div>    
</template>
<script>
import gql from "graphql-tag";
import _ from "lodash";
import ContainerItemOrder from "./ContainerItemOrder";
import { OrderFragment } from "@/client/queries";
import { OrderLocalFragment } from "@/client/queries";

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
    lastNumberTable() {
      return this.orders ? _.maxBy(this.orders, 'table.number').table.number : 0;
    },
    lowerCaseSearch(){
      return String(this.search).toLowerCase();
    },
    selectedOrders() {
      if (!this.search) return this.byUpdateOrder;
      return this.byUpdateOrder.filter(order => {
        const reg = new RegExp(this.lowerCaseSearch);
        return order.searchTags.some(({ value }) =>
          reg.test(value)
        );
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
