import App from './App.vue'
import { createApp } from 'vue'
// import { MotionPlugin } from '@vueuse/motion'
// element-plus
import ElementPlus from 'element-plus'
import './styles/element/index.scss'
// import { useElementPlus } from '@/plugins/element-plus'
// 引入公共样式
import './styles/index.scss'

import router from './router'
import store from './stores'
import svgIcon from '@/components/SvgIcon/index.vue'
// import './permission'
const app = createApp(App)
app.config.errorHandler = (err, vm, info) => {
  // handle error
  console.log('[全局异常]', err, vm, info)
}

app.use(ElementPlus, { zIndex: 3000 })
// app.use(useElementPlus)
app.component('svg-icon', svgIcon)
// app.use(MotionPlugin)
app.use(router)
app.use(store)
app.mount('#app')
