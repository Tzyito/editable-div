(function(n,l){typeof exports=="object"&&typeof module<"u"?module.exports=l(require("vue")):typeof define=="function"&&define.amd?define(["vue"],l):(n=typeof globalThis<"u"?globalThis:n||self,n.contenteditable=l(n.Vue))})(this,function(n){"use strict";const l=["contenteditable"];return n.defineComponent({__name:"editable-div",props:{canEdit:{type:Boolean,default:!0},limit:{default:99999},content:{},renderHtml:{type:Boolean,default:!1}},emits:["update:content","focus"],setup(p,{emit:m}){const i=p,a=m,c=n.ref(!1),r=n.ref(!1),u=n.ref(""),s=n.ref(),v=t=>{const e=s.value.textContent;c.value||(e.length>=i.limit?(t.preventDefault(),d(e)):(a("update:content",e),u.value=e))},C=t=>{const e=document.createRange();e.selectNodeContents(t),e.collapse(!1);const o=window.getSelection();o.removeAllRanges(),o.addRange(e),r.value=!0},f=t=>{t.type==="compositionstart"?c.value=!0:t.type==="compositionend"&&(c.value=!1)},d=t=>{let e;if(i.renderHtml){let o=document.createElement("div");o.style.display="none",o.innerHTML=t,e=o.innerText.slice(0,i.limit),s.value.innerHTML=t,o=null}else e=t.slice(0,i.limit),s.value.innerText=e;u.value=e,a("update:content",e),C(s.value)},h=()=>{r.value=!0,a("focus",!0)},_=()=>{r.value=!1,a("focus",!1)};return n.onMounted(()=>{s.value.addEventListener("paste",t=>{t.preventDefault();const e=t.clipboardData.getData("text/plain"),o=u.value+e;o.length>=i.limit?d(o):document.execCommand("insertText",!1,e)})}),n.watch(()=>i.content,t=>{if(!r){if(c)return;d(t)}}),(t,e)=>(n.openBlock(),n.createElementBlock("div",{ref_key:"editorContainer",ref:s,contenteditable:i.canEdit,onKeyup:v,onCompositionstart:f,onCompositionend:f,onFocus:h,onBlur:_},null,40,l))}})});
