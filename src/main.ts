import App from './App.vue'
import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
// element-plus
import ElementPlus from 'element-plus'
// import { useElementPlus } from '@/plugins/element-plus'

// 引入重置样式
import './styles/reset.scss'
// 引入公共样式
import './styles/index.scss'
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/styles/index.scss整体css文件导致热更新慢的问题
import './styles/tailwind.css'
// 引入element-plus样式
import './styles/element/index.scss'

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
app.use(MotionPlugin)
app.use(router)
app.use(store)
app.mount('#app')
