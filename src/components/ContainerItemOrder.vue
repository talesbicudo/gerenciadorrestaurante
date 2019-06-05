<template>
  <div v-if="!$apollo.loading" class="item-order">
        <div :class="classHeader">
          <span class="item-order__table-name">{{tableName}} </span>
          <span class="item-order__table-number">{{table.number | twoDigits}}</span>
        </div>
      <div class="item-order__content">
        <div class="item-order__info">
          <p v-if="open"><TimeIcon class="item-order__time-icon"/> {{updateLast | time}}</p>
          <p v-else> <LockIcon class="item-order__time-icon"/> {{closedAt | time}}</p>
        </div>
      </div>
  </div>
</template>

<script>
import InfoOrder from "@/mixins/InfoOrder";
import FormatPrice from "@/mixins/FormatPrice";
import FormatDate from "@/mixins/FormatDate";
import FormatNumber from "@/mixins/FormatNumber";
import LockIcon from "vue-ionicons/dist/md-lock";
import TimeIcon from "vue-ionicons/dist/md-time";

export default {
  mixins: [InfoOrder, FormatPrice, FormatDate, FormatNumber],
  components: { LockIcon, TimeIcon },
  props: {
    table: {
      type: Object,
      default: () => ({
        number: 0
      })
    },

    createdAt: {
      type: Date,
      default: () => new Date()
    },

    closedAt: {
      type: Date,
      default: () => new Date()
    },

    id: {
      type: String,
      default: "0"
    },

    items: {
      type: Array,
      default: () => [{ itemType: { value: 0 }, quantity: 1 }]
    },

    open: {
      type: Boolean,
      default: false
    },

    payments: {
      type: Array,
      default: () => []
    }
  },

  data: function() {
    return {
      tableName: "mesa"
    };
  },
  computed: {
    classHeader: function() {
      const base = "item-order__header";
      return `${base} ${this.open ? base + "--open" : ""}`;
    },
    updateLast: function() {
      return this.info.updates[this.info.updates.length - 1].date;
    }
  },

  methods: {
    toOrderPage: function() {}
  }
};
</script> 

<style lang="scss">
.item-order {
  display: inline-block;
  text-align: center;
  box-shadow: 0.2rem 0.2rem 0.3rem rgba($color-black, 0.2);
  border-radius: 3px;
  max-width: 22rem;
  min-width: 18rem;
  overflow: hidden;
  text-align: center;
  &__table-name {
    text-transform: uppercase;
  }
  &__table-number {
    font-size: $font-size-extra-huge;
  }
  &__header {
    color: $color-white;
    text-shadow: 0 -0.1rem 0.3rem rgba($color-black, 0.3);
    @include hoverableBg($color-red);
    &--open {
      @include hoverableBg($color-green);
    }
  }
  &__info {
    float: right;
    padding: 0 1rem;
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


