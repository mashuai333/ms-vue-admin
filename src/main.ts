import App from './App.vue'
import { createApp } from 'vue'
// import { MotionPlugin } from '@vueuse/motion'
// element-plus
import './styles/element/index.scss'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
  zIndex: 3000
})
app.config.errorHandler = (err, vm, info) => {
  // handle error
  console.log('[全局异常]', err, vm, info)
}

// app.use(MotionPlugin)
app.mount('#app')
