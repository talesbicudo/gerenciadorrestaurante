<template>
    <TablePrice name="payments" v-if="!$apollo.queries.order.loading" :attributes="tableAttrs">
        <template v-slot:total-cell-name>À pagar</template>
        <template v-slot:total-cell-value>{{toPay | formatPrice}}</template>
    </TablePrice>
</template>

<script>
import _ from "lodash";
import gql from "graphql-tag";
import FormatPrice from "@/mixins/FormatPrice";
import TablePrice from "./TablePrice";

export default {
  mixins: [FormatPrice],
  components: { TablePrice },
  props: {
    id: {
      type: String,
      default: "0"
    }
  },
  apollo: {
    order: {
      query: gql`
        query($id: String!) {
          order(id: $id) {
            payments {
              provider
              value
            }
            totalPrice @client
            totalPay @client
          }
        }
      `,
      variables() {
        return { id: this.id };
      }
    }
  },
  computed: {
    toPay() {
      return this.order.totalPrice - this.order.totalPay;
    },
    tableAttrs() {
      return [
        { name: "Cliente", values: _.map(this.order.payments, "provider") },
        { name: "Pagamento", values: _.map(this.order.payments, "value"), price: true }
      ];
    }
  }
};
</script>