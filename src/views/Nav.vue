<template>
    <nav class="nav">
        <div class="nav__selectors">
            <NavPage 
            class="nav__nav-page"
            @click="toDetails" 
            v-if="isSelectionPage && hasSelectedId"/>
            <NavPage 
            class="nav__nav-page"
            @click="toSelection" 
            v-if="isDetailsPage" 
            left/>
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
 @include respond(tab-land) {
   display: none;
 }
}
</style>
