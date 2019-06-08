<template>
  <div v-if="!$apollo.queries.order.loading" @click="setSelectedOrder" class="item-order">
        <div :class="classHeader">
          <span class="item-order__table-name"> mesa </span>
          <span class="item-order__table-number">{{order.table.number | twoDigits}}</span>
        </div>
      <div class="item-order__content">
        <div class="item-order__number">
          <p>N° {{order.number}}</p>
        </div>
        <div class="item-order__info">
          <p v-if="order.open"><TimeIcon class="item-order__time-icon"/> {{updateLast | time}}</p>
          <p v-else> <LockIcon class="item-order__time-icon"/> {{order.closedAt | time}}</p>
        </div>
        <div v-if="search" class="item-order__search-info">
          <SearchIcon class="item-order__search-icon"/>
          <p v-for="st in searchInfo" :key="st.value" class="item-order__search-info-item">
            {{st.type | mapTagType}}: <MarkedText :reg="search" :value="st.value"/>
          </p>
        </div>
      </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import FormatPrice from "@/mixins/FormatPrice";
import FormatDate from "@/mixins/FormatDate";
import FormatNumber from "@/mixins/FormatNumber";
import LockIcon from "vue-ionicons/dist/md-lock";
import TimeIcon from "vue-ionicons/dist/md-time";
import SearchIcon from "vue-ionicons/dist/md-search";
import SEARCH_TAG from "@/types/SearchTag";
import MarkedText from "@/components/MarkedText";

export default {
  mixins: [FormatPrice, FormatDate, FormatNumber],
  components: { MarkedText, LockIcon, TimeIcon, SearchIcon },
  props: {
    id: {
      type: String,
      default: "unattached"
    },

    search: {
      type: RegExp,
      default: () => null
    }
  },
  apollo: {
    order: {
      query: gql`
        query($id: String!) {
          order(id: $id) @client {
            table {
              number
            }
            number
            closedAt
            open
            closedAt
            updates @client
            searchTags @client
          }
        }
      `,
      variables() {
        return { id: this.id };
      }
    }
  },
  computed: {
    classHeader() {
      const base = "item-order__header";
      return `${base} ${this.order.open ? base + "--open" : ""}`;
    },
    updateLast() {
      return this.order.updates[this.order.updates.length - 1].date;
    },
    searchInfo() {
      return this.order.searchTags.filter(st => this.search.test(st.value));
    }
  },

  methods: {
    setSelectedOrder() {
      console.log(this.id);
      if (this.$store.state.orders.selectedId === this.id) {
        this.$store.commit("orderUnSelect");
      } else {
        this.$store.commit("orderSelect", { selectedId: this.id });
      }
    }
  },

  filters: {
    mapTagType(tagType) {
      return {
        [SEARCH_TAG.ITEM]: "Consumo",
        [SEARCH_TAG.PROVIDER]: "Cliente"
      }[tagType];
    }
  }
};
</script> 

<style lang="scss">
.item-order {
  $inner-padding: 0 0.5rem;
  box-shadow: 0.2rem 0.2rem 0.3rem rgba($color-black, 0.2);
  border-radius: 3px;
  overflow: hidden;
  background-color: $color-white;
  &__table-name {
    display: block;
    text-transform: uppercase;
  }
  &__table-number {
    font-size: $font-size-extra-huge;
    text-shadow: 0 0.1rem 0.3rem rgba($color-black, 0.3);
  }
  &__header {
    color: $color-white;
    padding: $inner-padding;
    @include hoverableBg($color-blue);
    &--open {
      @include hoverableBg($color-green);
    }
  }
  &__content {
    @include clearfix;
    padding: $inner-padding;
  }
  &__number {
    font-size: $font-size-small;
    float: left;
  }

  &__info {
    float: right;
  }

  &__search-info {
    clear: both;
    font-size: $font-size-tiny;
  }

  &__search-icon {
    display: inline;
  }

  &__time-icon {
    display: inline;
    position: relative;
    & svg {
      position: absolute;
      top: 50%;
      fill: $color-grey-dark;
      transform: translate(-100%, -50%);
    }
  }
}
</style>


