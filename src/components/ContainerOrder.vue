<template>
    <div class="order-container">
        <div class="order-container__loader" v-if="$apollo.loading"/>
        <ul v-else class="order-container__list">
           <li v-for="order in dateSortOrders" 
           class="order-container__row" :key="order.id">
               <ContainerItemOrder v-bind="order"/>
           </li> 
        </ul>
    </div>    
</template>
<script>

import ApolloConnectorOrders from '@/mixins/ApolloConnectorOrders';
import ContainerItemOrder from "./ContainerItemOrder";

export default {
  mixins: [ApolloConnectorOrders],
  components: {
    ContainerItemOrder
  },
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
      @include respond(tab-port){
        width: 33.3333%;
      }
      @include respond(desktop){
        width: 25%;
      }
    }
    
  }
</style>
