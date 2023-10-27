import { PropType } from "vue-demi";

type ComponentsType = "input" | "textarea";

export const dynamicProps = {
  /** allow edit the element */
  canEdit: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** allow limit max char number */
  limit: {
    type: Number as PropType<number>,
    default: 999999,
  },
  /** the element content (v-model) */
  content: {
    type: String as PropType<string>,
    required: true,
  },
  /** render html into the element */
  renderHtml: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** set the element row number (eg: like textarea row attributes*/
  row: {
    type: Number as PropType<number>,
    default: 1,
  },
  /** set the element type: input or textarea (eg: default */
  type: {
    type: String as PropType<ComponentsType>,
    default: "input",
  },
  /** when set the element as textarea, it will decide autogrow container box height */
  autogrow: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** inject class */
  wrapperClass: {
    type: String as PropType<string>,
    default: "",
    required: false,
  },
};
