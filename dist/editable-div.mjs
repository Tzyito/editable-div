import { defineComponent as z, ref as r, computed as B, onMounted as H, nextTick as F, watch as T, isVue3 as k, h as M } from "vue-demi";
const L = {
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
}, R = {
  resize: {
    resize: "vertical"
  },
  row: (n) => ({
    height: `${n}px`
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
  editableContainer: (n) => ({
    minHeight: `${n}px`,
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
}, O = z({
  name: "EditableDiv",
  props: L,
  emit: {
    "update:content": (n) => {
    },
    focus: (n) => {
    }
  },
  setup(n, { emit: a }) {
    const s = r(!1), l = r(!1), u = r(""), i = r(), { resize: f, row: h, textarea: m, autogrow: v, input: g, editableContainer: y } = R, d = 40, b = B(() => {
      const e = { ...y(d) };
      return n.type === "textarea" ? (Object.assign(e, { ...f, ...h(d), ...m }), n.autogrow && Object.assign(e, { ...v })) : Object.assign(e, { ...g }), e;
    }), C = (e) => {
      var o;
      const t = (o = i.value) == null ? void 0 : o.textContent;
      s.value || (w(), t.length >= n.limit ? (e.preventDefault(), c(t)) : (a("update:content", t), u.value = t));
    }, w = () => {
      var e;
      n.type === "input" && (i.value.scrollLeft = (e = i.value) == null ? void 0 : e.scrollWidth);
    }, x = (e) => {
      const t = document.createRange();
      t.setStartAfter(e.lastChild), t.collapse(!1);
      const o = window.getSelection();
      o.removeAllRanges(), o.addRange(t), l.value = !0;
    }, S = (e) => {
      e.type === "compositionstart" ? s.value = !0 : e.type === "compositionend" && (s.value = !1);
    }, c = (e) => {
      let t;
      if (n.renderHtml) {
        let o = document.createElement("div");
        o.style.display = "none", o.innerHTML = e, t = o.innerText.slice(0, n.limit), i.value.innerHTML = e + "&nbsp;", o = null;
      } else
        t = e.slice(0, n.limit), i.value.innerText = t;
      u.value = t, a("update:content", t), x(i.value);
    }, D = () => {
      l.value = !0, a("focus", !0);
    }, E = () => {
      l.value = !1, a("focus", !1);
    };
    return H(() => {
      F(() => {
        var e;
        (e = i.value) == null || e.addEventListener(
          "paste",
          (t) => {
            t.preventDefault();
            const o = t.clipboardData.getData("text/plain"), p = u.value + o;
            p.length >= n.limit ? c(p) : document.execCommand("insertText", !1, o);
          }
        );
      });
    }), T(
      () => n.content,
      (e) => {
        if (!l.value) {
          if (s.value)
            return;
          c(e);
        }
      }
    ), {
      ...n,
      isVue3: k,
      editorContainer: i,
      cssStyle: b,
      handleFocus: D,
      handleBlur: E,
      updateData: C,
      handleComposition: S
    };
  },
  render() {
    return M(
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
        on: {
          focus: this.handleFocus,
          blur: this.handleBlur,
          keyup: this.updateData,
          compositionstart: this.handleComposition,
          compositionend: this.handleComposition
        }
      }
    );
  }
});
export {
  O as default
};
