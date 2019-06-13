<template>
    <div class="form-add-payment">
        <h1>Pagamento</h1>
        <form @submit.prevent="callAddPayment" action="" class="form-add-payment__form">
            <CurrencyInput ref="currencyInput" 
            class="form-add-payment__all input--default "
             v-model="value" 
            :currency="currency" 
            :locale="locale" 
            :min="0"
            :placeholder="'valor'"/>
            <button class="button--default" type="click" @click.prevent="setToPay"> Restante </button>
            <Input v-model="client" :placeholder="'nome do cliente'"/>
            <button class="button--default" type="submit">Concluir</button>
        </form>
    </div>
</template>

<script>
import Input from "./TheInput";
import AddPayment from "@/mixins/AddPayment";

export default {
  mixins: [AddPayment],
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
    callAddPayment() {
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
      this.addPayment(id, value, client).then(() => {
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
