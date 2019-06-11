<template>
    <div class="details-order">
        <h1 class="details-order__heading">Detalhes</h1>
        <div v-if="!!storeSelectedId" class="details-order__content">
          <h3>Saldo: {{(order.totalPrice - order.totalPay) | formatPrice}}</h3>
          <TabbedContent  :data="tabData" />
          <div v-if="order.open" class="details-order__close-order">
              <label>Fechar Pedido </label>
             <button-close-order/>
          </div>
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
import ButtonCloseOrder from "./ButtonCloseOrder";

export default {
  mixins: [StoreSelectedId, FormatPrice],
  components: { TabbedContent, ButtonCloseOrder },
  apollo: {
    order: {
      query: gql`
        query($id: String!) {
          order(id: $id) {
            number
            totalPay @client
            totalPrice @client
            open
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