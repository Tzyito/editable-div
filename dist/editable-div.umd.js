(function(t,s){typeof exports=="object"&&typeof module<"u"?module.exports=s(require("vue-demi")):typeof define=="function"&&define.amd?define(["vue-demi"],s):(t=typeof globalThis<"u"?globalThis:t||self,t["editable-div"]=s(t.VueDemi))})(this,function(t){"use strict";const s={canEdit:{type:Boolean,default:!0},limit:{type:Number,default:999999},content:{type:String,required:!0},renderHtml:{type:Boolean,default:!1},row:{type:Number,default:1},type:{type:String,default:"input"},autogrow:{type:Boolean,default:!1},wrapperClass:{type:String,default:"",required:!1}},h={resize:{resize:"vertical"},row:o=>({height:`${o}px`}),textarea:{overflowX:"hidden",overflowY:"auto"},autogrow:{height:"auto",whiteSpace:"wrap"},input:{overflowX:"auto",overflowY:"hidden",whiteSpace:"nowrap"},editableContainer:o=>({minHeight:`${o}px`,width:"180px",display:"block",padding:"5px 15px",lineHeight:"1.5",boxSizing:"border-box",fontSize:"inherit",color:"#606266",backgroundColor:"#ffffff",backgroundImage:"none",border:"1px solid #dcdfe6",borderRadius:"4px",transition:"border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)"})};return t.defineComponent({name:"EditableDiv",props:s,emit:{"update:content":o=>{},focus:o=>{}},setup(o,{emit:l}){const r=t.ref(!1),d=t.ref(!1),u=t.ref(""),a=t.ref(),{resize:y,row:b,textarea:g,autogrow:m,input:v,editableContainer:C}=h,f=40,w=t.computed(()=>{const e={...C(f)};return o.type==="textarea"?(Object.assign(e,{...y,...b(f),...g}),o.autogrow&&Object.assign(e,{...m})):Object.assign(e,{...v}),e}),x=e=>{var i;const n=(i=a.value)==null?void 0:i.textContent;r.value||(S(),n.length>=o.limit?(e.preventDefault(),c(n)):(l("update:content",n),u.value=n))},S=()=>{var e;o.type==="input"&&(a.value.scrollLeft=(e=a.value)==null?void 0:e.scrollWidth)},E=e=>{const n=document.createRange();n.setStartAfter(e.lastChild),n.collapse(!1);const i=window.getSelection();i.removeAllRanges(),i.addRange(n),d.value=!0},T=e=>{e.type==="compositionstart"?r.value=!0:e.type==="compositionend"&&(r.value=!1)},c=e=>{let n;if(o.renderHtml){let i=document.createElement("div");i.style.display="none",i.innerHTML=e,n=i.innerText.slice(0,o.limit),a.value.innerHTML=e+"&nbsp;",i=null}else n=e.slice(0,o.limit),a.value.innerText=n;u.value=n,l("update:content",n),E(a.value)},z=()=>{d.value=!0,l("focus",!0)},B=()=>{d.value=!1,l("focus",!1)};return t.onMounted(()=>{t.nextTick(()=>{var e;(e=a.value)==null||e.addEventListener("paste",n=>{n.preventDefault();const i=n.clipboardData.getData("text/plain"),p=u.value+i;p.length>=o.limit?c(p):document.execCommand("insertText",!1,i)})})}),t.watch(()=>o.content,e=>{if(!d.value){if(r.value)return;c(e)}}),{...t.toRefs(o),isVue3:t.isVue3,editorContainer:a,cssStyle:w,handleFocus:z,handleBlur:B,updateData:x,handleComposition:T}},render(){return t.h("div",this.isVue3?{ref:"editorContainer",style:{...this.cssStyle},class:this.wrapperClass,contentEditable:this.canEdit,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.updateData,onCompositionstart:this.handleComposition,onCompositionend:this.handleComposition}:{ref:"editorContainer",style:{...this.cssStyle},class:this.wrapperClass,attrs:{contentEditable:this.canEdit},on:{focus:this.handleFocus,blur:this.handleBlur,keyup:this.updateData,compositionstart:this.handleComposition,compositionend:this.handleComposition}})}})});
