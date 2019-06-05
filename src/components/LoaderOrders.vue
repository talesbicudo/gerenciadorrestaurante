<template>
    <container-order v-if="!$apollo.queries.loadingOrders.loading"/>
    <div :dayDate="dayDate" v-else />
</template>

<script>
import ContainerOrder from "./ContainerOrder";
import { OrderFragment } from "@/client/queries";
import gql from "graphql-tag";
export default {
  components: { ContainerOrder },
  data: function() {
    return {
        dayDate: new Date()
    }
  },
  apollo: {
    loadingOrders: {
      query: gql`
        query($dayDate: DateTime!) {
          loadingOrders: dayOrders(dayDate: $dayDate) {
            ...orderData
          }
        }
        ${OrderFragment}
      `,
      variables() {
        return { dayDate: this.dayDate };
      }
    }
  }
};
</script>