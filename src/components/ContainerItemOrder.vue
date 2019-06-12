<template>
  <div class="item-order-container">
  <div v-if="!$apollo.queries.order.loading"  class="item-order">
        <div @click="setSelectedOrder" :class="classHeader">
          <span class="item-order__table-name"> mesa </span>
          <span class="item-order__table-number">{{order.table.number | twoDigits}}</span>
          <CheckMarkIcon class="item-order__check-icon" v-if="isSelectedId"/>
        </div>
      <div class="item-order__content">
        <div class="item-order__number">
          <p>N° {{order.number}}</p>
        </div>
        <div class="item-order__info">
          <p v-if="order.open"><TimeIcon class="item-order__time-icon"/> {{order.createdAt | time }}</p>
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
    <containerItemOrderButtons class="item-order__buttons" :id="id"/>
  </div>
</template>

<script>
import gql from "graphql-tag";
import FormatPrice from "@/mixins/FormatPrice";
import FormatDate from "@/mixins/FormatDate";
import FormatNumber from "@/mixins/FormatNumber";
import StoreSelectedId from "@/mixins/StoreSelectedId";
import LockIcon from "vue-ionicons/dist/md-lock";
import TimeIcon from "vue-ionicons/dist/md-time";
import CheckMarkIcon from "vue-ionicons/dist/md-arrow-back";
import SearchIcon from "vue-ionicons/dist/md-search";
import SEARCH_TAG from "@/types/SearchTag";
import MOBILE from "@/types/MobilePage";
import MarkedText from "./MarkedText";
import ContainerItemOrderButtons from "./ContainerItemOrderButtons";
export default {
  mixins: [FormatPrice, FormatDate, FormatNumber, StoreSelectedId],
  components: {
    MarkedText,
    LockIcon,
    TimeIcon,
    SearchIcon,
    CheckMarkIcon,
    ContainerItemOrderButtons
  },
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
            createdAt
            open
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
      const openClass = this.order.open ? base + "--open" : "";
      const selectedClass =
        this.isSelectedId ? base + "--selected" : "";
      return `${base} ${openClass} ${selectedClass}`;
    },
    updateLast() {
      return this.order.updates[this.order.updates.length - 1].date;
    },
    searchInfo() {
      return this.order.searchTags.filter(st => this.search.test(st.value));
    },
    isSelectedId() {
      return this.id === this.storeSelectedId;
    }
  },

  methods: {
    setSelectedOrder() {
      if (this.isSelectedId) {
        this.$store.commit("orderUnSelect");
      } else {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
        this.$store.commit("orderSelect", { selectedId: this.id });
        this.$store.commit("mobilePageChange", { type: MOBILE.ORDER_DETAILS });
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
    position: relative;
    color: $color-white;
    padding: $inner-padding;
    background-color: $color-blue;
    cursor: pointer;
    &--open {
      background-color: $color-green;
    }
    &--selected::after,
    &:hover::after {
      content: "\A";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(222, 255, 255, 0.1);
      opacity: 1;
      transition: all 0.5s;
      -webkit-transition: all 0.5s;
      -moz-transition: all 0.5s;
    }
  }
  &__check-icon {
    fill: $color-white;
    display: inline-block;
    font-size: $font-size-big;
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
  &__buttons {
    text-align: center;
    margin-top: 1rem;
  }
}
</style>


