# editable-div
Create an editable div element, supports vue components
<br>

<p align="center">
<img src="https://raw.githubusercontent.com/tzyito/editable-div/main/playground/public/logo.svg" style="width:100px;" />
</p>

<h1 align="center">Editor-div</h1>

<p align="center">
Create an editable div element, supports vue2 & vue3 (🚀powered by <a href="https://github.com/antfu/vue-demi">vue-demi</a>)
</p>

<p align="center">
<a href="https://www.npmjs.com/package/editable-div"><img src="https://img.shields.io/npm/v/editable-div?color=c95f8b&amp;label=" alt="NPM version"></a></p>

## About
When I need the content of the input box to perform certain actions such as <span style="background-color:yellow;color: #000">highlighting</span>, I usually use the input, textarea elements. <br/>
But we can't easily get the selected text from these elements and manipulate it. So we can use the [`contenteditable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable) attribute, if you have tried it then I am sure you should encounter a lot of input problems. So to solve these difficulties I have implemented it! _It's not that hard, but it's convenient_

## instalation
Both vue2 and vue3 support
```bash
# or
pnpm add editable-div
# or
npm install editable-div
# or
yarn add editable-div
```

## Usage
### Local Registra
```vue
<script setup>
import { ref } from "vue";
import EditableDiv from "editable-div";
const content = ref("");
</script>

<template>
    <EditableDiv class="container" :content="content" :limit="10"></EditableDiv>
</template>
<style>
.container {
  background: #fff;
  height: 100px;
  width: 200px;
}
</style>

```
### Global Registration

```vue
import { createApp } from 'vue'
import EditableDiv from "editable-div"  

createApp()
  .use(EditableDiv)
  .mount('#app')
```
## Examples
more example information, please check [the playground](https://github.com/Tzyito/editable-div/tree/main/playground)
## Props
| Name       | Description               | Type    | Default |
|------------|---------------------------|---------| ------- |
| canEdit    | allow edit the element    | Boolean | true    |
| limit      | allow limit max char number | Number  | 999999  |
| content(*)    | the element content (v-model) | String  | (required) |
| renderHtml | render html into the element | Boolean | false   |
| row        | set the element row number (eg: like textarea row attributes) | Number  | 1       |
| type       | set the element type: input or textarea (eg: default) | String  | input   |
| autogrow   | when set the element as textarea, it will decide autogrow container box height | Boolean | false   |
| wrapperClass | inject class               | String  | ""      |

> tips: Attributes marked with * must be passed
## License

[MIT](./LICENSE) License &copy; 2021-PRESENT [tzyito](https://github.com/tzyito)
