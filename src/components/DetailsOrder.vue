<template>
    <div class="details-order">
        <h1 v-if="!!order" class="details-order__heading"> Pedido {{order.number}}</h1>
        <button> Novo pedido </button>
    </div>
</template>

<script>
import gql from "graphql-tag";

export default {
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