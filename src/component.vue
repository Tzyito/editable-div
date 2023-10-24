<script lang="ts" setup>
import { onMounted, ref, watch } from "vue-demi";

const props = withDefaults(
  defineProps<{
    canEdit: boolean;
    limit: number;
    content: string;
    renderHtml: boolean;
  }>(),
  {
    canEdit: true,
    limit: 99999,
    renderHtml: false,
  }
);
const emits = defineEmits<{
  (e: "update:content", str: string): void;
  (e: "focus", isFoucs: boolean): void;
}>();

const isComposing = ref(false);
const isFoucs = ref(false);
const limitedText = ref("");
const editorContainer = ref();

const updateData = (e: Event) => {
  const word = editorContainer.value.textContent;
  /** isCompositng char */
  if (isComposing.value) return;
  if (word.length >= props.limit) {
    e.preventDefault();
    resizeClearCharacter(word);
  } else {
    emits("update:content", word);
    limitedText.value = word;
  }
};

const setCursorPosition = (element: HTMLElement) => {
  // Create a new range object
  const range = document.createRange();
  // Set cursor into the string last
  range.selectNodeContents(element);
  range.collapse(false);
  // Get the current selection
  const selection = window.getSelection();
  // Remove any current selections
  selection!.removeAllRanges();
  // Add the new range
  selection!.addRange(range);
  isFoucs.value = true;
};

const handleComposition = (event: CompositionEvent) => {
  if (event.type === "compositionstart") {
    isComposing.value = true;
  } else if (event.type === "compositionend") {
    isComposing.value = false;
  }
};

const resizeClearCharacter = (resultText: string) => {
  let result;
  if (props.renderHtml) {
    let div: HTMLDivElement | null = document.createElement("div");
    div.style.display = "none";
    div.innerHTML = resultText;
    result = div.innerText.slice(0, props.limit);
    editorContainer.value.innerHTML = resultText;
    div = null;
  } else {
    result = resultText.slice(0, props.limit);
    editorContainer.value.innerText = result;
  }
  limitedText.value = result;
  emits("update:content", result);
  setCursorPosition(editorContainer.value);
};

const handleFocus = () => {
  isFoucs.value = true;
  emits("focus", true);
};

const handleBlur = () => {
  isFoucs.value = false;
  emits("focus", false);
};

onMounted(() => {
  editorContainer.value.addEventListener("paste", (e: ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData!.getData("text/plain");
    const resultText = limitedText.value + text;
    if (resultText.length >= props.limit) {
      resizeClearCharacter(resultText);
    } else {
      document.execCommand("insertText", false, text);
    }
  });
});
watch(
  () => props.content,
  (val) => {
    if (!isFoucs) {
      /** isCompositng char */
      if (isComposing) return;
      resizeClearCharacter(val);
    }
  }
);
</script>

<template>
  <div
    ref="editorContainer"
    :contenteditable="props.canEdit"
    @keyup="updateData"
    @compositionstart="handleComposition"
    @compositionend="handleComposition"
    @focus="handleFocus"
    @blur="handleBlur"
  ></div>
</template>
