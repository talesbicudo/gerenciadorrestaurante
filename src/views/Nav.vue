<template>
    <nav class="nav">
        <div class="nav__selectors">
            <NavPage>Right</NavPage>
            <NavPage left>Left</NavPage>
        </div>
    </nav>
</template>

<script>
import NavPage from "@/components/NavPage";
import SecondaryHeading from "@/components/TheSecondaryHeading";
export default {
  components: { NavPage }
};
</script>

<style lang="scss">
.nav {
  width: 100%;
  height: 6rem;
  &__selectors {
    position: relative;
  }
}
</style>
