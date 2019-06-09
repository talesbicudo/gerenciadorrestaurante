<template>
    <div class="order-container">
        <div class="order-container__search-container">
          <Input 
            class="order-container__search order-container__search--number"
            id="number"
            placeholder="Mesa"
            :inputProps="numberSubProps"
            v-model="numberSearch"
           />
          <Input 
            class="order-container__search order-container__search--tag"
            placeholder="Cliente/Consumo"
            :inputProps="{type: 'search'}"
            v-model="search"/> 
        </div>
        <div class="order-container__loader" v-if="$apollo.loading"/>
        <ul v-else class="order-container__list">
           <li v-for="order in validatedOrders" 
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
      numberSearch: ""
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
      },
    }
  },
  computed: {
    lastNumberTable() {
      return this.orders
        ? _.maxBy(this.orders, "table.number").table.number
        : 0;
    },
    regExpSearch() {
      return this.search ? new RegExp(String(this.search), "i") : null;
    },
    searchOrders() {
      if (!this.search) return this.orders;
      return this.orders.filter(order =>
        order.searchTags.some(({ value }) => this.regExpSearch.test(value))
      );
    },
    numberTableOrders() {
      if (!this.numberSearch) return this.orders;
      return this.orders.filter(order =>
        (new RegExp(this.numberSearch)).test(String(order.table.number))
      );
    },
    filterOrders() {
      return [this.searchOrders, this.numberTableOrders];
    },
    validatedOrders() {
      const filteredOrders = _.intersectionBy(...this.filterOrders, 'id');
      return [...filteredOrders]
        .sort(
          (orderA, orderB) =>
            _.last(orderA.updates).date - _.last(orderB.updates).date
        )
        .reverse();
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
  $horizontal-padding: 2rem;
  $margin-right: 2rem;
  margin: auto; 
  &__list {
    @include flexGrid;
    justify-content: center;
    &-item {
        padding: 1rem $horizontal-padding;
    }
  }

  &__search-container {
    padding: 0 $horizontal-padding;
  }
  &__search {
    padding: 0 $horizontal-padding;
    display: inline-block;
    &:not(:last-of-type) {
      margin-right: $margin-right;
    }
    &--number {
      width: 30%;
    }
    &--tag {
      width: calc(70% - #{$margin-right});
    }
  }
}
</style>
