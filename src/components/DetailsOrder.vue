<template>
    <div class="details-order">
        <h1 class="details-order__heading">Detalhes</h1>
        <div v-if="!!storeSelectedId" class="details-order__content">
          <h3>Saldo: {{(order.totalPrice - order.totalPay) | formatPrice}}</h3>
          <TabbedContent  :data="tabData" />
          <div v-if="order.open" class="details-order__close-order">
             <button v-if="balanceIsZero" class="button--default" @click="closeOrder">
               Fechar Mesa
             </button>
             <button v-else class="button--default" @click="closeWarn">
               Fechar Mesa
             </button>
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
import FormatPrice from "@/mixins/FormatPrice";
import CloseOrder from "@/mixins/CloseOrder";
import BalanceOrder from "@/mixins/BalanceOrder";
import TablePricePayments from "./TablePricePayments";
import TablePriceItems from "./TablePriceItems";
import TabbedContent from "./TabbedContent";
import WarnCloseOrder from "./WarnCloseOrder";

export default {
  mixins: [StoreSelectedId, FormatPrice, CloseOrder, BalanceOrder],
  components: { TabbedContent },
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
  },

  methods: {
    closeWarn(){
      this.$store.commit("popupOpen", {type: WarnCloseOrder})
    }
  }
};
</script>