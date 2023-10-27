<template>
  <div id="app">
    <EditableDiv class="container" :content="content" :limit="10"></EditableDiv>
  </div>
</template>

<script>
import EditableDiv from "editable-div";
export default {
  name: "App",
  components: {
    EditableDiv,
  },
  data() {
    return {
      content: "",
    };
  },
};
</script>
<style>
.container:focus {
  outline: none;
  border-color: #0b6fd6 !important;
}
.container:hover {
  border-color: #c0c4cc !important;
}
</style>
