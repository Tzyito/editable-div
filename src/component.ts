import {
  computed,
  defineComponent,
  h,
  isVue3,
  isVue2,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue-demi";
import { dynamicProps } from "./types";
import { cssStyleModules } from "./style";

export default defineComponent({
  name: "EditableDiv",
  props: dynamicProps,
  emit: {
    "update:content": (_payload: string) => {},
    focus: (_isFocus: boolean) => {},
  },
  setup(props, { emit }) {
    const isComposing = ref(false);
    const isFoucs = ref(false);
    const limitedText = ref("");
    const editorContainer = ref();
    const { resize, row, textarea, autogrow, input, editableContainer } =
      cssStyleModules;

    console.log("isVue3: ", isVue2, isVue3);

    const baseHeight = 40;
    const cssStyle = computed(() => {
      const styleMap = { ...editableContainer(baseHeight) };
      /** if textarea: resize row */
      if (props.type === "textarea") {
        Object.assign(styleMap, { ...resize, ...row(baseHeight), ...textarea });
        /** if autogrow*/
        if (props.autogrow) {
          Object.assign(styleMap, { ...autogrow });
        }
      } else {
        Object.assign(styleMap, { ...input });
      }
      return styleMap;
    });

    const updateData = (e: Event) => {
      const word = editorContainer.value?.textContent!;
      /** isCompositng char */
      if (isComposing.value) return;
      listenXScroll();
      if (word.length >= props.limit) {
        e.preventDefault();
        resizeClearCharacter(word);
      } else {
        emit("update:content", word);
        limitedText.value = word;
      }
    };
    const listenXScroll = () => {
      if (props.type === "input") {
        editorContainer.value.scrollLeft = editorContainer.value?.scrollWidth;
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
      emit("update:content", result);
      setCursorPosition(editorContainer.value);
    };

    const handleFocus = () => {
      isFoucs.value = true;
      emit("focus", true);
    };

    const handleBlur = () => {
      isFoucs.value = false;
      emit("focus", false);
    };

    onMounted(() => {
      nextTick(() => {
        console.log("editorContainer.value: ", editorContainer.value);
        editorContainer.value?.addEventListener(
          "paste",
          (e: ClipboardEvent) => {
            e.preventDefault();
            const text = e.clipboardData!.getData("text/plain");
            const resultText = limitedText.value + text;
            if (resultText.length >= props.limit) {
              resizeClearCharacter(resultText);
            } else {
              document.execCommand("insertText", false, text);
            }
          }
        );
      });
    });

    watch(
      () => props.content,
      (val) => {
        if (!isFoucs) {
          /** isCompositng char */
          if (isComposing) return;
          resizeClearCharacter(val as string);
        }
      }
    );

    return {
      ...props,
      isVue3,
      editorContainer,
      cssStyle,
      handleFocus,
      handleBlur,
      updateData,
      handleComposition,
    };
  },
  render() {
    return h(
      "div",
      this.isVue3
        ? {
            ref: "editorContainer",
            style: { ...this.cssStyle },
            class: this.wrapperClass,
            contentEditable: this.canEdit,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onKeyup: this.updateData,
            onCompositionstart: this.handleComposition,
            onCompositionend: this.handleComposition,
          }
        : {
            ref: "editorContainer",
            style: { ...this.cssStyle },
            class: this.wrapperClass,
            attrs: {
              contentEditable: this.canEdit,
            },
            on: {
              focus: this.handleFocus,
              blur: this.handleBlur,
              keyup: this.updateData,
              compositionstart: this.handleComposition,
              compositionend: this.handleComposition,
            },
          }
    );
  },
});
