<template>
    <TablePrice @add="addPayment" name="payments" v-if="!$apollo.queries.order.loading" :attributes="tableAttrs">
        <template v-slot:total-cell-name>À pagar</template>
        <template v-slot:total-cell-value>{{toPay | formatPrice}}</template>
    </TablePrice>
</template>

<script>
import _ from "lodash";
import FormatPrice from "@/mixins/FormatPrice";
import TablePrice from "./TablePrice";
import {TablePayments} from '@/client/queries'
import POPUP from '@/types/Popup';

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
      query: TablePayments,
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
  },
  methods: {
    addPayment(){
      this.$store.commit('popupOpen', {type: POPUP.PAYMENT_ADD})
    }
  }
};
</script>