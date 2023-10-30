<script lang="ts" setup>
import { reactive, ref } from "vue";
import EditableDiv from "editable-div";
const content = ref("");
const states = reactive({
  autogrow: false,
  type: "input",
  renderHtml: false,
  canEdit: true,
});
const limit = ref(10);
const renderHtml = ref("");
const handleSwitch = (key: string, value: any = null) => {
  return (states[key] = value ? value : !states[key]);
};
const handleRender = () => {
  content.value = renderHtml.value;
};
const resultText = ref("");
</script>
<template>
  <div>
    <div style="margin-bottom: 10px">
      <button @click="handleSwitch('autogrow')">check autogrow</button>
      <button @click="handleSwitch('type', 'textarea')">check type</button>
      <button @click="handleSwitch('renderHtml')">check renderHtml</button>
      <button @click="handleSwitch('canEdit')">check canEdit</button>
      max word: <input type="number" v-model="limit" />
      <div style="margin-top: 10px">
        render html string:
        <textarea type="textarea" v-model="renderHtml" style="width: 300px" />
      </div>
      <button @click="handleRender">start render</button>
    </div>
    <EditableDiv
      class="container"
      :content="content"
      :limit="limit"
      @update:content="(s) => (resultText = s)"
      v-bind="states"
    ></EditableDiv>
    <p>your textContent: {{ resultText }}</p>
    <p>Remaining word count: {{ limit - resultText.length }}</p>
    <div>
      <li v-for="(key, index) in Object.keys(states)" :key="index">
        current {{ key }}:
        <span style="color: blueviolet"> {{ states[key] }}</span>
      </li>
    </div>
  </div>
</template>
<style>
.container {
  background: #fff;
  width: 200px;
}
</style>
