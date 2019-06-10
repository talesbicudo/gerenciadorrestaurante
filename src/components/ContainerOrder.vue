<template>
    <div class="order-container">
        <h1>Mesas</h1>
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
import _ from "lodash";
import ContainerItemOrder from "./ContainerItemOrder";
import Input from "./TheInput";
import { Container } from "@/client/queries";
export default {
  components: {
    ContainerItemOrder,
    Input
  },
  data: function() {
    return {
      search: "",
      numberSearch: ""
    };
  },
  apollo: {
    orders: Container
  },
  computed: {
    dayDate() {
      return this.$store.state.orders.selectedDay;
    },
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
        new RegExp(this.numberSearch).test(String(order.table.number))
      );
    },
    filterOrders() {
      return [this.searchOrders, this.numberTableOrders];
    },
    validatedOrders() {
      const filteredOrders = _.intersectionBy(...this.filterOrders, "id");
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
  padding: 0 $horizontal-padding;
  margin: auto;
  margin: auto;
  &__list {
    @include flexGrid;
    &-item {
      padding: 1rem $horizontal-padding;
    }
  }

  &__search-container {
    overflow: hidden;
  }
  &__search {
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
