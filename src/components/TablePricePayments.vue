<template>
  <div class="table-payments">
    <TablePrice :editable="order.open" @remove="callRemovePayment" name="payments" v-if="!$apollo.queries.order.loading" :attributes="tableAttrs">
        <template v-slot:total-cell-name>Total</template>
        <template v-slot:total-cell-value>{{order.totalPay | formatPrice}}</template>
    </TablePrice>
    <button class="button--default" @click="addPayment" v-if="order.open">Adicionar</button>
  </div>
</template>

<script>
import _ from "lodash";
import FormatPrice from "@/mixins/FormatPrice";
import FormatDate from "@/mixins/FormatDate";
import StoreSelectedId from "@/mixins/StoreSelectedId";
import RemovePayment from "@/mixins/RemovePayment"
import TablePrice from "./TablePrice";
import { TablePayments } from "@/client/queries";
import FormAddPayment from "./FormAddPayment";

export default {
  mixins: [FormatPrice, FormatDate, StoreSelectedId, RemovePayment],
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
    callRemovePayment(i){
      const paymentToRemoveId = this.order.payments[i].id;
      this.removePayment(this.storeSelectedId, paymentToRemoveId);
    },
    addPayment() {
      this.$store.commit("popupOpen", {
        type: FormAddPayment,
        args: { toPay: this.toPay }
      });
    }
  }
};
</script>