<template>
    <table class="table-price">
        <thead>
            <tr>
                <th v-for="attrName in attrNames" :key="attrName">{{attrName}}</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for="(row, i) in attrRows" :key="`row-${i}`">
            <td v-for="attr in row" :key="attr.value">{{attr.value | formatPrice(attr.isPrice)}}</td>
        </tr>
        </tbody>
        <tfoot>
            <tr>
                <td :colspan="totalCellNameLenght"><slot name="total-cell-name">Total</slot></td>
                <td><slot name="total-cell-value"></slot></td>
            </tr>
        </tfoot>
   </table>
</template>

<script>
import FormatPrice from "@/mixins/FormatPrice";
import _ from "lodash";

export default {
  mixins: [FormatPrice],
  props: {
    attributes: {
      type: Array,
      default: () => [
        { name: "name", values: ["default", "default2"] },
        { name: "price", values: [1, 2], price: true }
      ],
      validator(attributes) {
        return (
          _.uniq(_.map(attributes, "values.length")).length === 1 &&
          _.some(attributes, { price: true })
        );
      }
    }
  },
  computed: {
    attrNames() {
      return _.map(this.attributes, "name");
    },
    attrRows() {
      return _.zip(
        ...this.attributes.map(attr =>
          attr.values.map(value => ({
            value,
            isPrice: attr.price || false
          }))
        )
      );
    },
    totalCellNameLenght() {
      return this.attributes.length - 1;
    }
  },
  methods: {}
};
</script>