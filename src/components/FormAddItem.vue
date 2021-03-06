<template>
    <div class="form-add-item">
        <h1>Adicionar Item</h1>
        <form @submit.prevent="addItems" action="" class="form-add-payment__form">
            <div class="form-add-item__search">
                <Input v-model="search" type="search" placeholder="Procurar Item"/>
                <div name="items" class="form-add-item__search-list">
                   <div class="form-add-item__search-item" v-for="item in searchedItems" :key="item.id" :value="item.id">
                      <span> {{item.name}}</span>
                      <button type="button" @click="addItemForm(item.id)"><AddIcon/></button>
                    </div>
                </div>
            </div>
            <div class="form-add-item__selected">
                <div v-for="selected in selected" :key="selected.id" class="form-add-item__selected-item">
                   <label>{{selected.name}} </label> 
                   <button @click="removeItemForm(selected.id)" type="button">
                     <RemoveIcon/>
                    </button>
                   <Input v-model="selected.quantity" placeholder="" :default="'1'" :inputProps="{type: 'number', min: '1'}"/>
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
import AddIcon from "vue-ionicons/dist/md-add";
import RemoveIcon from "vue-ionicons/dist/md-remove";

export default {
  mixins: [StoreSelectedId],
  components: { Input, AddIcon, RemoveIcon },
  data() {
    return {
      search: "",
      selected: {}
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
    }
  },
  methods: {
    addItemForm(id) {
      this.selected = {
        ...this.selected,
        [id]: {
          ..._.find(this.itemTypes, { id }),
          quantity: 1
        }
      };
    },
    removeItemForm(id) {
      delete this.selected[id];
      this.$forceUpdate();
    },
    addItems() {
      Promise.all(
        Object.values(this.selected)
        .filter(({quantity}) => quantity > 0)
        .map(data =>
          this.addItem(data)
        )
      ).then(() => this.$store.commit("popupClose"));
    },
    addItem({ id, quantity }) {
      const orderId = this.storeSelectedId;
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
        variables: { orderId, quantity: +quantity, itemId: id },
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
  $height: 50vh;
  &__search-item {
    $child-padding: 1rem;
    &:nth-of-type(even){
      background-color: $color-white;
      color: $color-grey-dark;
    }
    span {
      font-size: $font-size-big;
      padding-left: $child-padding;
      float: left;
    }
    button {
      font-size: $font-size-big;
      fill: $color-grey-dark;
      padding-right: $child-padding;
      float: right;
    }
    @include clearfix;
  }
  &__search-list {
    border-radius: 2px;
    border: 1px solid $color-grey-dark;
    width: 30%;
    overflow-y: auto;
    float: left;
    height: $height
  }
  &__selected {
    float: left;
    height: $height;
    overflow-y: auto;
    margin-left: 2rem;
  }
  &__selected-item {
    label,
    input {
      display: inline-block;
    }
    label {
      font-size: $font-size-big;
    } 
    > button {
      font-size: $font-size-big;
      color: $color-grey-dark;
      margin-left: .5rem;
    }
  }

  &__submit {
    padding-top: 1rem;
    clear: both;
    display: block;
  }
}
</style>

