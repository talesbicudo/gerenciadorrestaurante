<template>
    <div class="details-order">
        <h1 class="details-order__heading">Detalhes</h1>
        <div v-if="!!storeSelectedId" class="main">
          <h3>Saldo: {{(order.totalPrice - order.totalPay) | formatPrice}}</h3>
          <TabbedContent  :data="tabData" />
        </div>
        <div v-else>
          <h3>Selecione uma mesa</h3>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
import StoreSelectedId from "@/mixins/StoreSelectedId";
import TablePricePayments from "./TablePricePayments";
import TablePriceItems from "./TablePriceItems";
import TabbedContent from "./TabbedContent";
import FormatPrice from "@/mixins/FormatPrice";

export default {
  mixins: [StoreSelectedId, FormatPrice],
  components: { TabbedContent },
  apollo: {
    order: {
      query: gql`
        query($id: String!) {
          order(id: $id) {
            number
            totalPay @client
            totalPrice @client
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
  data() {
    return {
      tabData: [
        {
          name: "Pagamentos",
          component: TablePricePayments
        },
        {
          name: "Compras",
          component: TablePriceItems
        }
      ]
    };
  }
};
</script>