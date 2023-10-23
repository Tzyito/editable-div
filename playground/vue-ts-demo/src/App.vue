<script lang="ts" setup>
import { ref } from "vue";
import EditableDiv from "editable-div";
const a = ref("");
</script>
<template>
  <EditableDiv class="container" :content="a"></EditableDiv>
</template>
<style>
body {
  background-color: #000;
}
.container {
  background: #fff;
  height: 100px;
  width: 200px;
}
</style>
