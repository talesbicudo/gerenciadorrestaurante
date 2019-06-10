<template>
  <div class="home">
    <Popup/>
    <Nav/> 
    <LoaderOrders/>
  </div>
</template>

<script>
import LoaderOrders from '@/components/LoaderOrders';
import Nav from './Nav';
import Popup from '@/components/Popup';

export default {
  name: 'home',
  components: {
    LoaderOrders, Nav, Popup
  }
}
</script>

<style lang="scss">
  .home {
    height: 100vh;
    width: 100%;
  }
</style>
