<template>
    <div class="warn-close-order">
        <h1 class="warn-close-order__heading">Diferença de Valor</h1>
        <p v-if="balanceIsPositive"> Valor restante à pagar: {{balance | formatPrice}}</p>
        <p v-else> Valor pago à mais: {{balanceAbs | formatPrice}}</p>
        <p> Continuar mesmo assim? </p>
        <button @click="closeOrder" class="button--default warn-close-order__button">Continuar</button>
        <button @click="cancel" class="button--default">Cancelar</button>
    </div>
</template>

<script>
import gql from "graphql-tag";
import CloseOrder from "@/mixins/CloseOrder";
import StoreSelectedId from "@/mixins/StoreSelectedId";
import FormatPrice from "@/mixins/FormatPrice";
import BalanceOrder from "@/mixins/BalanceOrder";

export default {
  mixins: [CloseOrder, StoreSelectedId, FormatPrice, BalanceOrder],

  apollo: {
    order: {
      query: gql`
        query($id: String!) {
          order(id: $id) {
            totalPay @client
            totalPrice @client
          }
        }
      `,
      variables() {
        return { id: this.storeSelectedId };
      }
    }
  },
  methods: {
      cancel(){
          this.$store.commit('popupClose');
      }
  }
};
</script>
