<template>
    <form action="" class="form-add-payment">
        <Input v-model="client" :inputProps="{autofocus: true}" :placeholder="'nome do cliente'"/>
        <Input v-model="value"  :placeholder="'valor'"/>
    </form>
</template>

<script>
import Input from "./TheInput";
export default {
  components: { Input },
  data() {
    return {
      client: "",
      value: ""
    };
  }
};
</script>

<style lang="scss">
.form-add-payment {
}
</style>
