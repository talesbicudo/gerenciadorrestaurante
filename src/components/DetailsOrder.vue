<template>
    <div class="details-order">
        <h1 v-if="!!order" class="details-order__heading"> Pedido {{order.number}}</h1>
        <TablePricePayments v-if="!!storeSelectedId" :id="storeSelectedId"/>
    </div>
</template>

<script>
import gql from "graphql-tag";
import TablePricePayments from "./TablePricePayments";

export default {
  components: { TablePricePayments },
  apollo: {
    order: {
      query: gql`
        query($id: String!) {
          order(id: $id) {
            number
          }
        }
      `,
      skip() {
        return !this.storeSelectedId;
      },
      variables() {
        return { id: this.storeSelectedId };
      }
    }
  },
  computed: {
    storeSelectedId() {
      return this.$store.state.orders.selectedId;
    }
  }
};
</script>