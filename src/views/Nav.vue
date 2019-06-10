<template>
    <nav class="nav">
        <h1>Restaurante</h1>
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
      console.log("details");
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
  position: relative;
  width: 100%;
  height: 6rem;
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
