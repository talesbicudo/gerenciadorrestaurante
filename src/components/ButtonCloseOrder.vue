<template>
    <button @click="closeOrder" class="button--default"><slot>Fechar</slot></button>
</template>

<script>
import CloseOrder from '@/mixins/CloseOrder';
export default {
  mixins: [CloseOrder]
};
</script>
