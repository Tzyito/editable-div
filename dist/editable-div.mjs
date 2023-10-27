import { defineComponent as z, ref as r, isVue2 as H, isVue3 as C, computed as T, onMounted as M, nextTick as k, watch as L, h as y } from "vue-demi";
const R = {
  /** allow edit the element */
  canEdit: {
    type: Boolean,
    default: !0
  },
  /** allow limit max char number */
  limit: {
    type: Number,
    default: 999999
  },
  /** the element content (v-model) */
  content: {
    type: String,
    required: !0
  },
  /** render html into the element */
  renderHtml: {
    type: Boolean,
    default: !1
  },
  /** set the element row number (eg: like textarea row attributes*/
  row: {
    type: Number,
    default: 1
  },
  /** set the element type: input or textarea (eg: default */
  type: {
    type: String,
    default: "input"
  },
  /** when set the element as textarea, it will decide autogrow container box height */
  autogrow: {
    type: Boolean,
    default: !1
  },
  /** inject class */
  wrapperClass: {
    type: String,
    default: "",
    required: !1
  }
}, V = {
  resize: {
    resize: "vertical"
  },
  row: (t) => ({
    height: `${t}px`
  }),
  textarea: {
    overflowX: "hidden",
    overflowY: "auto"
  },
  autogrow: {
    height: "auto",
    whiteSpace: "wrap"
  },
  input: {
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap"
  },
  editableContainer: (t) => ({
    minHeight: `${t}px`,
    width: "180px",
    display: "block",
    padding: "5px 15px",
    lineHeight: "1.5",
    boxSizing: "border-box",
    fontSize: "inherit",
    color: "#606266",
    backgroundColor: "#ffffff",
    backgroundImage: "none",
    border: "1px solid #dcdfe6",
    borderRadius: "4px",
    transition: "border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)"
  })
}, N = z({
  name: "EditableDiv",
  props: R,
  emit: {
    "update:content": (t) => {
    },
    focus: (t) => {
    }
  },
  setup(t, { emit: a }) {
    const s = r(!1), l = r(!1), u = r(""), i = r(), { resize: b, row: w, textarea: x, autogrow: S, input: E, editableContainer: B } = V;
    console.log("isVue3: ", H, C);
    const p = 40, f = T(() => {
      const e = { ...B(p) };
      return t.type === "textarea" ? (Object.assign(e, { ...b, ...w(p), ...x }), t.autogrow && Object.assign(e, { ...S })) : Object.assign(e, { ...E }), e;
    }), h = (e) => {
      var o;
      const n = (o = i.value) == null ? void 0 : o.textContent;
      s.value || (D(), n.length >= t.limit ? (e.preventDefault(), c(n)) : (a("update:content", n), u.value = n));
    }, D = () => {
      var e;
      t.type === "input" && (i.value.scrollLeft = (e = i.value) == null ? void 0 : e.scrollWidth);
    }, F = (e) => {
      const n = document.createRange();
      n.selectNodeContents(e), n.collapse(!1);
      const o = window.getSelection();
      o.removeAllRanges(), o.addRange(n), l.value = !0;
    }, d = (e) => {
      e.type === "compositionstart" ? s.value = !0 : e.type === "compositionend" && (s.value = !1);
    }, c = (e) => {
      let n;
      if (t.renderHtml) {
        let o = document.createElement("div");
        o.style.display = "none", o.innerHTML = e, n = o.innerText.slice(0, t.limit), i.value.innerHTML = e, o = null;
      } else
        n = e.slice(0, t.limit), i.value.innerText = n;
      u.value = n, a("update:content", n), F(i.value);
    }, m = () => {
      l.value = !0, a("focus", !0);
    }, v = () => {
      l.value = !1, a("focus", !1);
    };
    return M(() => {
      k(() => {
        var e;
        console.log("editorContainer.value: ", i.value), (e = i.value) == null || e.addEventListener(
          "paste",
          (n) => {
            n.preventDefault();
            const o = n.clipboardData.getData("text/plain"), g = u.value + o;
            g.length >= t.limit ? c(g) : document.execCommand("insertText", !1, o);
          }
        );
      });
    }), L(
      () => t.content,
      (e) => {
        if (!l) {
          if (s)
            return;
          c(e);
        }
      }
    ), {
      ...t,
      isVue3: C,
      render: () => y("div", {
        ref: "editorContainer",
        style: { ...f.value },
        class: t.wrapperClass,
        contenteditable: t.canEdit,
        onFocus: m,
        onBlur: v,
        onKeyup: h,
        onCompositionstart: d,
        onCompositionend: d
      }),
      editorContainer: i,
      cssStyle: f,
      handleFocus: m,
      handleBlur: v,
      updateData: h,
      handleComposition: d
    };
  },
  render() {
    return y(
      "div",
      this.isVue3 ? {
        ref: "editorContainer",
        style: { ...this.cssStyle },
        class: this.wrapperClass,
        contentEditable: this.canEdit,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onKeyup: this.updateData,
        onCompositionstart: this.handleComposition,
        onCompositionend: this.handleComposition
      } : {
        ref: "editorContainer",
        style: { ...this.cssStyle },
        class: this.wrapperClass,
        attrs: {
          contentEditable: this.canEdit
        },
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onKeyup: this.updateData,
        onCompositionstart: this.handleComposition,
        onCompositionend: this.handleComposition
      }
    );
  }
});
export {
  N as default
};
