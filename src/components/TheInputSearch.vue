<template>
    <input @change="changeHandler" v-model="value" type="search" placeholder="procurar">
</template>

<script>
export default {
   data: function() {
       return {
           value: ""
       }
   },
   methods: {
       changeHandler(){
           this.$emit('change', this.value);
       }
   }
}
</script>
