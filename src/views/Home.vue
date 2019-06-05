<template>
  <div class="home">
    <secondary-heading>Pedidos</secondary-heading>
    <ContainerOrder/>
  </div>
</template>

<script>
// @ is an alias to /src
import ContainerOrder from '@/components/ContainerOrder';
import SecondaryHeading from '@/components/TheSecondaryHeading';
export default {
  name: 'home',
  components: {
    ContainerOrder, SecondaryHeading
  }
}
</script>

<style lang="scss">
  .home {
    height: 100vh;
    width: 100%;
  }
</style>
