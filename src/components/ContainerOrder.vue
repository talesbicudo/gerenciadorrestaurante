<template>
    <div class="order-container">
        <div class="order-container__search-inputs">
          <Input 
            class="order-container__search order-container__search--number"
            id="number"
            placeholder="Mesa"
            :inputProps="numberSubProps"
            v-model="number"
           />
          <Input 
            class="order-container__search order-container__search--tag"
            placeholder="Marcações"
            :inputProps="{type: 'search'}"
            v-model="search"/> 
        </div>
        <div class="order-container__loader" v-if="$apollo.loading"/>
        <ul v-else class="order-container__list">
           <li v-for="order in selectedOrders" 
           class="order-container__list-item" :key="order.id">
               <ContainerItemOrder :search="regExpSearch" :id="order.id"/>
           </li> 
        </ul>
    </div>    
</template>
<script>
import gql from "graphql-tag";
import _ from "lodash";
import ContainerItemOrder from "./ContainerItemOrder";
import Input from "./TheInput";
import { OrderFragment } from "@/client/queries";
import { OrderLocalFragment } from "@/client/queries";

export default {
  components: {
    ContainerItemOrder,
    Input
  },
  props: {
    dayDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data: function() {
    return {
      search: "",
      number: ""
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
      return this.orders
        ? _.maxBy(this.orders, "table.number").table.number
        : 0;
    },
    regExpSearch() {
      return this.search ? new RegExp(String(this.search), "i") : null;
    },
    selectedOrders() {
      if (!this.search) return this.byUpdateOrder;
      return this.byUpdateOrder.filter(order => {
        return order.searchTags.some(({ value }) =>
          this.regExpSearch.test(value)
        );
      });
    },
    numberSubProps() {
      return {
        min: "0",
        type: "number",
        max: this.lastNumberTable,
        step: "1"
      };
    }
  }
};
</script>

<style lang="scss">
.order-container {
  $margin-right: 2rem;
  &__list {
    @include flexGrid;
  }

  &__search {
    overflow: hidden;
    display: inline-block;
    &:not(:last-of-type) {
      margin-right: $margin-right;
    }
    &--number {
      width: calc(15% - #{$margin-right});
    }
    &--tag {
      width: calc(50% - #{$margin-right});
    }
  }
}
</style>
