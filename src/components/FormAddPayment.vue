<template>
    <div class="form-add-payment">
        <h1>Pagamento</h1>
        <form @submit.prevent="addPayment" action="" class="form-add-payment__form">
            <CurrencyInput :class="'input--default'"
             v-model="value" 
            :currency="currency" 
            :locale="locale" :max="toPay" 
            :distractionFree="false"
             autofocus :placeholder="'valor'"/>
            <button class="button--default" type="click" @click.prevent="setToPay"> Tudo </button>
            <Input v-model="client" :placeholder="'nome do cliente'"/>
            <button class="button--default" type="submit">Done</button>
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
      value: 0,
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
      const client = this.client;
      const value = this.$parseCurrency(
        this.value || "0",
        this.locale,
        this.currency
      );
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
}
</style>
