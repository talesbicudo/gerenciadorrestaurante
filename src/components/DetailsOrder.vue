<template>
    <div class="details-order">
        <h1 class="details-order__heading"> Detalhes</h1>
        <TabbedContent v-if="!!storeSelectedId" :data="tabData" />
        <div v-else>
          <h3>Selecione uma mesa</h3>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
import StoreSelectedId from '@/mixins/StoreSelectedId'
import TablePricePayments from "./TablePricePayments";
import TablePriceItems from "./TablePriceItems";
import TabbedContent from "./TabbedContent";

export default {
  mixins: [StoreSelectedId],
  components: { TabbedContent },
  apollo: {
    order: {
      query: gql`
        query($id: String!) {
          order(id: $id) {
            number
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
          component: TablePricePayments,
        },
        {
          name: "Compras",
          component: TablePriceItems,
        }
      ]
    };
  }
};
</script>