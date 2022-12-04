import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const app = createApp(App)

app.config.errorHandler = (err, vm, info) => {
  // handle error
  console.log('[全局异常]', err, vm, info)
}
app.mount('#app')