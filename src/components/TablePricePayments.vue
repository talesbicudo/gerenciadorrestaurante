<template>
  <div class="table-payments">
    <TablePrice name="payments" v-if="!$apollo.queries.order.loading" :attributes="tableAttrs">
        <template v-slot:total-cell-name>À pagar</template>
        <template v-slot:total-cell-value>{{toPay | formatPrice}}</template>
    </TablePrice>
    <button class="button--default" @click="addPayment" v-if="order.open">Adicionar</button>
    <div v-else>
      <p> Pago às {{order.closedAt | time}}</p>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import FormatPrice from "@/mixins/FormatPrice";
import FormatDate from "@/mixins/FormatDate";
import StoreSelectedId from "@/mixins/StoreSelectedId";
import TablePrice from "./TablePrice";
import { TablePayments } from "@/client/queries";
import POPUP from "@/types/Popup";

export default {
  mixins: [FormatPrice, FormatDate, StoreSelectedId],
  components: { TablePrice },

  apollo: {
    order: {
      query: TablePayments,
      skip() {
        return !this.hasSelectedId;
      },
      variables() {
        return { id: this.storeSelectedId };
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
        {
          name: "Pagamento",
          values: _.map(this.order.payments, "value"),
          price: true
        }
      ];
    }
  },
  methods: {
    addPayment() {
      this.$store.commit("popupOpen", {
        type: POPUP.PAYMENT_ADD,
        args: { toPay: this.toPay }
      });
    }
  }
};
</script>