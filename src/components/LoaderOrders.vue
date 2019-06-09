<template>
    <Pages v-if="!$apollo.queries.loadingOrders.loading"/>
</template>

<script>
import { OrderFragment } from "@/client/queries";
import Pages from "@/components/Pages";
import gql from "graphql-tag";
export default {
  components: { Pages },
  data: function() {
    return {
      dayDate: new Date()
    };
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
  },
  
};
</script>