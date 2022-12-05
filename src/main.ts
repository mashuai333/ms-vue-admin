import { createApp } from 'vue'
import { MotionPlugin } from "@vueuse/motion";

import './style.css'
import App from './App.vue'
const app = createApp(App)
app.config.errorHandler = (err, vm, info) => {
  // handle error
  console.log('[全局异常]', err, vm, info)
}

app.use(MotionPlugin)
app.mount('#app')
