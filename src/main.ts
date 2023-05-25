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

const app = createApp(App)

import router from './router'
import store from './stores'
import svgIcon from '@/components/SvgIcon/index.vue'

// import './permission'
app.config.errorHandler = (err, vm, info) => {
  // handle error
  console.log('[全局异常]', err, vm, info)
}
// 全局注册`@iconify/vue`图标库

import { IconifyIconOffline, IconifyIconOnline, FontIcon } from './components/ReIcon'
app.component('IconifyIconOffline', IconifyIconOffline)
app.component('IconifyIconOnline', IconifyIconOnline)
app.component('FontIcon', FontIcon)

app.use(ElementPlus, { zIndex: 3000 })
// app.use(useElementPlus)
// 自定义引入svg组件
app.component('svg-icon', svgIcon)
app.use(MotionPlugin)
app.use(router)
app.use(store)
app.mount('#app')
