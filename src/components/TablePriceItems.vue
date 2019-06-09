<template>
    <TablePrice name="items" v-if="!$apollo.queries.order.loading" :attributes="tableAttrs">
        <template v-slot:total-cell-name>Total</template>
        <template v-slot:total-cell-value>{{order.totalPrice | formatPrice}}</template>
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
            consumedItems {
                quantity
                itemType {
                    name
                    value
                }
                totalPrice @client
            }
            totalPrice @client
          }
        }
      `,
      variables() {
        return { id: this.id };
      }
    }
  },
  computed: {
      tableAttrs(){
          const consumedItems = this.order.consumedItems;
          return [
              {name: "Item", values: _.map(consumedItems, 'itemType.name')},
              {name: "Preço", values: _.map(consumedItems, 'itemType.value'), price: true},
              {name: "Quantidade", values: _.map(consumedItems, 'quantity')},
              {name: "Total", values: _.map(consumedItems, 'totalPrice'), price: true}
          ]
      }
  }
};
</script>