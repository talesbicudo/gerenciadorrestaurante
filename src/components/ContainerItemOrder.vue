<template>
  <div v-if="!$apollo.loading" class="item-order">
        <div :class="classHeader">
          <span class="item-order__table-name"> mesa </span>
          <span class="item-order__table-number">{{table.number | twoDigits}}</span>
        </div>
      <div class="item-order__content">
        <div class="item-order__number">
          <p>N° {{number}}</p>
        </div>
        <div class="item-order__info">
          <p v-if="open"><TimeIcon class="item-order__time-icon"/> {{updateLast | time}}</p>
          <p v-else> <LockIcon class="item-order__time-icon"/> {{closedAt | time}}</p>
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
import FormatPrice from "@/mixins/FormatPrice";
import FormatDate from "@/mixins/FormatDate";
import FormatNumber from "@/mixins/FormatNumber";
import LockIcon from "vue-ionicons/dist/md-lock";
import TimeIcon from "vue-ionicons/dist/md-time";
import SearchIcon from "vue-ionicons/dist/md-search";
import SEARCH_TAG from "@/types/SearchTag";
import MarkedText from '@/components/MarkedText';

export default {
  mixins: [FormatPrice, FormatDate, FormatNumber],
  components: { MarkedText, LockIcon, TimeIcon, SearchIcon },
  props: {
    table: {
      type: Object,
      default: () => ({
        number: 0
      })
    },

    closedAt: {
      type: Date,
      default: () => new Date()
    },

    open: {
      type: Boolean,
      default: false
    },

    updates: {
      type: Array,
      default: () => []
    },

    number: {
      type: Number,
      default: 0
    },

    searchTags: {
      type: Array,
      default: () => []
    },

    search: {
      type: RegExp,
      default: () => null
    }
  },

  computed: {
    classHeader() {
      const base = "item-order__header";
      return `${base} ${this.open ? base + "--open" : ""}`;
    },
    updateLast() {
      return this.updates[this.updates.length - 1].date;
    },
    searchInfo() {
      return this.searchTags.filter(st => this.search.test(st.value));
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


