<template>
    <Pages v-if="!$apollo.queries.loadingOrders.loading"/>
</template>

<script>
import { LoadingOrders } from "@/client/queries";
import Pages from "@/components/Pages";
export default {
  components: { Pages },
  data: function() {
    return {
      dayDate: new Date()
    };
  },
  apollo: {
    loadingOrders: LoadingOrders
  },
};
</script>