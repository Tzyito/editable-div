import { defineComponent as h, ref as c, onMounted as x, watch as _, openBlock as y, createElementBlock as B } from "vue";
const D = ["contenteditable"], T = /* @__PURE__ */ h({
  __name: "editable-div",
  props: {
    canEdit: { type: Boolean, default: !0 },
    limit: { default: 99999 },
    content: {},
    renderHtml: { type: Boolean, default: !1 }
  },
  emits: ["update:content", "focus"],
  setup(f, { emit: p }) {
    const o = f, a = p, s = c(!1), i = c(!1), r = c(""), l = c(), m = (t) => {
      const e = l.value.textContent;
      s.value || (e.length >= o.limit ? (t.preventDefault(), u(e)) : (a("update:content", e), r.value = e));
    }, v = (t) => {
      const e = document.createRange();
      e.selectNodeContents(t), e.collapse(!1);
      const n = window.getSelection();
      n.removeAllRanges(), n.addRange(e), i.value = !0;
    }, d = (t) => {
      t.type === "compositionstart" ? s.value = !0 : t.type === "compositionend" && (s.value = !1);
    }, u = (t) => {
      let e;
      if (o.renderHtml) {
        let n = document.createElement("div");
        n.style.display = "none", n.innerHTML = t, e = n.innerText.slice(0, o.limit), l.value.innerHTML = t, n = null;
      } else
        e = t.slice(0, o.limit), l.value.innerText = e;
      r.value = e, a("update:content", e), v(l.value);
    }, C = () => {
      i.value = !0, a("focus", !0);
    }, g = () => {
      i.value = !1, a("focus", !1);
    };
    return x(() => {
      l.value.addEventListener("paste", (t) => {
        t.preventDefault();
        const e = t.clipboardData.getData("text/plain"), n = r.value + e;
        n.length >= o.limit ? u(n) : document.execCommand("insertText", !1, e);
      });
    }), _(
      () => o.content,
      (t) => {
        if (!i) {
          if (s)
            return;
          u(t);
        }
      }
    ), (t, e) => (y(), B("div", {
      ref_key: "editorContainer",
      ref: l,
      contenteditable: o.canEdit,
      onKeyup: m,
      onCompositionstart: d,
      onCompositionend: d,
      onFocus: C,
      onBlur: g
    }, null, 40, D));
  }
});
export {
  T as default
};
