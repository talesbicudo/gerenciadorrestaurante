<template>
    <span class="markable">{{outsOfMark[0]}}<mark class="markable__mark">{{inOfMark}}</mark>{{outsOfMark[1]}}</span>
</template>

<script>
export default {
  props: {
    reg: {
      type: RegExp,
      default: () => null
    },
    value: {
      type: String,
      default: ""
    }
  },
  computed: {
    outsOfMark() {
      return this.value.slice(0).split(this.reg) || ["", ""];
    },
    inOfMark() {
      const match = this.value.match(this.reg);
      return match ? match[0] : "";
    }
  }
};
</script>