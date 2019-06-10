<template>
    <nav class="nav">
        <div class="nav__selectors">
            <NavPage @click="toDetails" v-if="isSelectionPage && hasSelectedId"/>
            <NavPage @click="toSelection" v-if="isDetailsPage" left/>
        </div>
    </nav>
</template>

<script>
import NavPage from "@/components/NavPage";
import MOBILE from "@/types/MobilePage";

export default {
  components: { NavPage },
  computed: {
    currentPage() {
      return this.$store.state.mobilePage.type;
    },
    hasSelectedId() {
      return !!this.$store.state.orders.selectedId;
    },
    isSelectionPage() {
      return this.currentPage === MOBILE.ORDER_SELECT;
    },
    isDetailsPage() {
      return this.currentPage === MOBILE.ORDER_DETAILS;
    }
  },
  methods: {
    toDetails() {
      this.$store.commit("mobilePageChange", { type: MOBILE.ORDER_DETAILS });
    },
    toSelection() {
      this.$store.commit("mobilePageChange", { type: MOBILE.ORDER_SELECT });
    }
  }
};
</script>

<style lang="scss">
.nav {
  h1 {
    text-align: center;
  }
  position: fixed;
  top: 50%;
  width: 100%;
  height: 6rem;
  z-index: 1;
  &__selectors {
    position: absolute;

    width: 100%;
    opacity: 1;
    transition: all #{$page-transition-time};
    display: block;
    @include respond(tab-land) {
      opacity: 0;
    }
  }
}
</style>
