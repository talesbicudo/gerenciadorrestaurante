<template>
    <div class="table-price-items" v-if="!$apollo.queries.order.loading">
      <TablePrice @remove="removeItem" name="items"  :attributes="tableAttrs">
          <template v-slot:total-cell-name>Total</template>
          <template v-slot:total-cell-value>{{order.totalPrice | formatPrice}}</template>
      </TablePrice>
      <button v-if="order.open" @click="addItem" class="button--default">Adicionar</button>
    </div>
</template>
<script>
import _ from "lodash";
import {TableItems} from "@/client/queries";
import FormatPrice from "@/mixins/FormatPrice";
import StoreSelectedId from '@/mixins/StoreSelectedId'
import TablePrice from "./TablePrice";
import FormAddItem from "./FormAddItem";

export default {
  mixins: [FormatPrice, StoreSelectedId],
  components: { TablePrice },
  apollo: {
    order: {
      query: TableItems,
      variables() {
        return { id: this.storeSelectedId };
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
              {name: "Valor", values: _.map(consumedItems, 'totalPrice'), price: true}
          ]
      }
  },
  methods: {
    addItem(){
      this.$store.commit('popupOpen', {type: FormAddItem})
    },
    removeItem(i){
      console.log(i);
    }
  }
};
</script>