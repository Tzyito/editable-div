import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import EditableDiv from "editable-div";

createApp(App).use(EditableDiv).mount('#app')
