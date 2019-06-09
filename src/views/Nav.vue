<template>
    <nav class="nav">
        <SecondaryHeading>Selections</SecondaryHeading>
        <div class="nav__selectors">
            <NavPage @click="toDetails" v-if="isSelectionPage"/>
            <NavPage @click="toSelection" v-if="isDetailsPage" left/>
        </div>
    </nav>
</template>

<script>
import NavPage from "@/components/NavPage";
import SecondaryHeading from "@/components/TheSecondaryHeading";
import MOBILE from "@/types/MobilePage";

export default {
  components: { NavPage, SecondaryHeading },
  computed: {
    currentPage(){
      return this.$store.state.mobilePage.type;
    },
    isSelectionPage(){
      return this.currentPage === MOBILE.ORDER_SELECT;
    },
    isDetailsPage(){
      return this.currentPage === MOBILE.ORDER_DETAILS;
    }
  },
  methods: {
    toDetails() {
      this.$store.commit('mobilePageChange', {type: MOBILE.ORDER_DETAILS})
    },
    toSelection() {
      this.$store.commit('mobilePageChange', {type: MOBILE.ORDER_SELECT})
    }
  }
};
</script>

<style lang="scss">
.nav {
  width: 100%;
  height: 6rem;
  &__selectors {
    position: relative;
    opacity: 1;
    transition: all #{$page-transition-time};
    display: block;
    @include respond(tab-land){
      opacity: 0;
    }
  }
  
}
</style>
