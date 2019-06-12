<template>
   <div v-if="!$apollo.queries.order.loading" class="item-order-buttons">
       <button @click="callNewOrder" v-if="!order.open" class="item-order-buttons button--default">
           Novo Pedido
       </button>
   </div> 
</template>

<script>
import gql from "graphql-tag";
import NewOrder from "@/mixins/NewOrder";
import MOBILE from "@/types/MobilePage";
export default {
  mixins: [NewOrder],
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  apollo: {
    order: {
      query: gql`
        query($id: String!) {
          order(id: $id) @client {
            open
            table {
              number
            }
          }
        }
      `,
      variables() {
        return { id: this.id };
      }
    }
  },
  methods: {
    callNewOrder() {
      this.newOrder(this.order.table.number).then(
        ({ data: { newOrder: { id } } }) => {
          this.$store.commit("orderSelect", { selectedId: id });
          this.$store.commit("mobilePageChange", {
            type: MOBILE.ORDER_DETAILS
          });
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
        }
      );
    }
  }
};
</script>