<template>
    <div class="form-add-payment">
        <h1>Pagamento</h1>
        <form @submit.prevent="addPayment" action="" class="form-add-payment__form">
            <CurrencyInput ref="currencyInput" 
            class="form-add-payment__all input--default "
             v-model="value" 
            :currency="currency" 
            :locale="locale" :max="toPay" 
            :placeholder="'valor'"/>
            <button class="button--default" type="click" @click.prevent="setToPay"> Restante </button>
            <Input v-model="client" :placeholder="'nome do cliente'"/>
            <button class="button--default" type="submit">Concluir</button>
        </form>
    </div>
</template>

<script>
import gql from "graphql-tag";
import { OrderFragment, TablePayments, Container } from "@/client/queries";
import Input from "./TheInput";
export default {
  components: { Input },
  data() {
    return {
      client: "",
      value: null,
      locale: "pt-br",
      currency: "BRL"
    };
  },
  computed: {
    selectedId() {
      return this.$store.state.orders.selectedId;
    },
    toPay() {
      return this.$store.state.popup.args.toPay;
    }
  },
  methods: {
    setToPay() {
      this.value = this.toPay;
    },
    addPayment() {
      const client = this.client || "Anônimo";
      const value = this.$parseCurrency(
        this.value || "0",
        this.locale,
        this.currency
      );
      if (value === 0) {
        this.$store.commit("popupClose");
        return;
      }
      const id = this.selectedId;
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($id: String!, $value: Float!, $client: String) {
              addPayment(value: $value, id: $id, provider: $client) {
                id
                provider
                value
                createdAt
              }
            }
          `,
          variables: {
            id,
            value,
            client
          },
          update(client, { data: { addPayment } }) {
            const data = client.readFragment({ id, fragment: OrderFragment });
            data.payments.push(addPayment);
            client.writeFragment({
              id,
              fragment: OrderFragment,
              data
            });
          },
          refetchQueries: [
            { query: Container },
            { query: TablePayments, variables: { id } }
          ]
        })
        .then(() => {
          this.$store.commit("popupClose");
        });
    }
  }
};
</script>

<style lang="scss">
.form-add-payment {
  &__all {
    margin-bottom: 1rem;
    margin-right: 1rem;
    width: 30%;
  }
}
</style>
