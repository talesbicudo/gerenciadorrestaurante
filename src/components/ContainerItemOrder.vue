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
import FormatPrice from "@/mixins/FormatPrice";
import FormatDate from "@/mixins/FormatDate";
import FormatNumber from "@/mixins/FormatNumber";
import LockIcon from "vue-ionicons/dist/md-lock";
import TimeIcon from "vue-ionicons/dist/md-time";

export default {
  mixins: [ FormatPrice, FormatDate, FormatNumber],
  components: { LockIcon, TimeIcon },
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
      return this.updates[this.updates.length - 1].date;
    }
  },

  methods: {
    toOrderPage: function() {}
  }
};
</script> 

<style lang="scss">
.item-order {
  box-shadow: 0.2rem 0.2rem 0.3rem rgba($color-black, 0.2);
  border-radius: 3px;
  overflow: hidden;
  background-color: $color-white;
  &__table-name {
    text-transform: uppercase;
  }
  &__table-number {
    font-size: $font-size-extra-huge;
    text-shadow: 0 0.1rem 0.3rem rgba($color-black, 0.3);
  }
  &__header {
    color: $color-white;
    padding: 0 1rem;
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


