<template>
  <div class="home">
    <secondary-heading>Pedidos</secondary-heading>
    <LoaderOrders/>
  </div>
</template>

<script>
import LoaderOrders from '@/components/LoaderOrders';
import SecondaryHeading from '@/components/TheSecondaryHeading';
export default {
  name: 'home',
  components: {
    LoaderOrders, SecondaryHeading
  }
}
</script>

<style lang="scss">
  .home {
    height: 100vh;
    width: 100%;
  }
</style>
