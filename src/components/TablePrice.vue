<template>
    <div class="table-price">
        <table class="table-price__table">
            <thead>
                <tr>
                    <th v-for="attrName in attrNames" :key="attrName">{{attrName}}</th>
                </tr>
            </thead>
            <tbody>
            <tr class="table-price__row-body" v-for="(row, i) in attrRows" 
            :key="`row-${name}-${i}`">
                <td class="table-price__body-cell"
                v-for="(attr, i) in row"
                :key="i">
                    {{attr.value | formatPrice(attr.isPrice)}}
                </td>
                <td v-if="editable" class="table-price__body-cell table-price__body-cell--remove">
                  <button @click="$emit('remove', i)" href="#">
                    <RemoveIcon/>
                  </button>
                </td>
            </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td :colspan="totalCellNameLenght">
                        <slot name="total-cell-name">Total</slot></td>
                    <td><slot name="total-cell-value"></slot></td>
                </tr>
            </tfoot>
        </table>
    </div>

</template>

<script>
import FormatPrice from "@/mixins/FormatPrice";
import RemoveIcon from "vue-ionicons/dist/md-remove";
import _ from "lodash";

export default {
  mixins: [FormatPrice],
  components: { RemoveIcon },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    attributes: {
      type: Array,
      default: () => [
        { name: "name", values: ["default", "default2"] },
        { name: "price", values: [1, 2], price: true }
      ],
      required: true,
      validator(attributes) {
        return (
          _.uniq(_.map(attributes, "values.length")).length === 1 &&
          _.some(attributes, { price: true })
        );
      }
    },
    name: {
      type: String,
      default: "",
      required: true
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

<style lang="scss">
.table-price {
  &__row-body {
    color: $color-black;
    &:nth-of-type(odd) {
      background-color: $color-white;
    }
  }

  margin-bottom: 2rem;
  &__table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    td,
    th {
      border: 1px solid $color-black;
      padding: 0.5rem 0.4rem;
    }
    td {
      font-size: $font-size-small;
    }
    tbody,
    thead {
      background: #cfcfcf;
      background: -moz-linear-gradient(
        top,
        #dbdbdb 0%,
        #d3d3d3 66%,
        #cfcfcf 100%
      );
      background: -webkit-linear-gradient(
        top,
        #dbdbdb 0%,
        #d3d3d3 66%,
        #cfcfcf 100%
      );
      background: linear-gradient(
        to bottom,
        #dbdbdb 0%,
        #d3d3d3 66%,
        #cfcfcf 100%
      );
    }
    thead th {
      font-size: 15px;
      font-weight: bold;
      color: #000000;
      text-align: left;
    }
    tfoot {
      font-size: 14px;
      font-weight: bold;
      color: #000000;
    }
    tfoot td {
      font-size: 14px;
    }
    tbody .table-price__body-cell--remove {
      border: none;
      font-size: $font-size-big;
      background: white;
      cursor: pointer;
      width: 5rem;
    }
  }
}
</style>
