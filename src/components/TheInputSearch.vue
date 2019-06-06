<template>
    <input  @input="$emit('input', $event.target.value)"   type="search" placeholder="procurar">
</template>

<script>
export default {
  
}
</script>
