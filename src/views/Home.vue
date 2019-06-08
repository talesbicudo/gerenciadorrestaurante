<template>
  <div class="home">
    <Nav/> 
    <LoaderOrders/>
  </div>
</template>

<script>
import LoaderOrders from '@/components/LoaderOrders';
import Nav from './Nav';

export default {
  name: 'home',
  components: {
    LoaderOrders, Nav
  }
}
</script>

<style lang="scss">
  .home {
    height: 100vh;
    width: 100%;
  }
</style>
