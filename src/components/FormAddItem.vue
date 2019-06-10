<template>
    <div class="form-add-item">
        <h1>Adicionar Item</h1>
        <form @submit.prevent="addItems" action="" class="form-add-payment__form">
            <div class="form-add-item__search">
                <Input v-model="search" type="search" placeholder="Procurar Item"/>
                <select name="items" v-model="selected" multiple="" class="form-add-item__search-list">
                   <option v-for="item in searchedItems" :key="item.id" :value="item.id">
                       {{item.name}}
                    </option>
                </select>
            </div>
            <div v-if="quantities.length" class="form-add-item__selected">
                <div v-for="(selected, i) in selectedData" :key="selected.id" class="form-add-item__selected-item">
                   <label>{{selected.name}} </label>
                   <Input v-model="quantities[i].value" placeholder="" :default="'1'" :inputProps="{type: 'number', min: '1'}"/>
                </div>
            </div>
            <div class="form-add-item__submit">
                <button type="submit" class="button--default ">Adicionar</button>
            </div>
        </form>
    </div>
</template>
<script>
import {
  ItemTypes,
  OrderFragment,
  Container,
  TableItems
} from "@/client/queries";
import Input from "./TheInput";
import StoreSelectedId from "@/mixins/StoreSelectedId";
import gql from "graphql-tag";
import _ from "lodash";

const LIMIT = 3;
export default {
  mixins: [StoreSelectedId],
  components: { Input },
  data() {
    return {
      search: "",
      selected: [],
      quantities: []
    };
  },
  apollo: {
    itemTypes: ItemTypes
  },
  computed: {
    searchedItems() {
      if (!this.search) return this.itemTypes;
      return this.itemTypes.filter(item =>
        new RegExp(String(this.search), "i").test(item.name)
      );
    },
    selectedData() {
      return this.selected
        .map(id => _.find(this.itemTypes, { id }))
        .map((data, i) => ({ ...data, i }))
        .slice(0, LIMIT);
    }
  },
  watch: {
    selected(val) {
      this.quantities = val.map(() => ({ value: "1" }));
    }
  },
  methods: {
    addItems() {
      Promise.all(
        this.selectedData.map(data =>
          this.addItem(data, this.quantities[data.i])
        )
      ).then(() => this.$store.commit("popupClose"));
    },
    addItem({ id }, q) {
      const orderId = this.storeSelectedId;
      const quantity = +q.value;
      return this.$apollo.mutate({
        mutation: gql`
          mutation($orderId: String!, $quantity: Int!, $itemId: String!) {
            addItem(orderId: $orderId, quantity: $quantity, itemId: $itemId) {
              id
              quantity
              itemType {
                id
                name
                value
              }
              createdAt
            }
          }
        `,
        variables: { orderId, quantity, itemId: id },
        update(client, { data: { addItem } }) {
          const data = client.readFragment({
            id: orderId,
            fragment: OrderFragment
          });
          data.consumedItems.push(addItem);
          client.writeFragment({
            id: orderId,
            fragment: OrderFragment,
            data
          });
        },
        refetchQueries: [
          { query: Container },
          { query: TableItems, variables: { id: orderId } }
        ]
      });
    }
  }
};
</script>

<style lang="scss">
.form-add-item {
  &__search-list {
    width: 30%;
    height: 30vh;
    float: left;
  }
  &__selected-item {
    float: left;
    margin-left: 1rem;
    width: 15%;
    label,
    input {
      display: inline-block;
    }
  }
  &__submit {
    margin-top: 12rem;
    clear: both;
    display: block;
  }
}
</style>

