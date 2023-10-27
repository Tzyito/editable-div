<script lang="ts" setup>
import { ref } from "vue";
import EditableDiv from "editable-div";
const content = ref("");
</script>
<template>
  <div>
    <EditableDiv class="container" :content="content" :limit="10"></EditableDiv>
    <p>输入内容：{{ content }}</p>
  </div>
</template>
<style>
.container {
  background: #fff;
  height: 100px;
  width: 200px;
}
</style>
