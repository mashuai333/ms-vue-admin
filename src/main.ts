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

// 初始化多语言
import { setupI18n } from '@/plugins/vueI18n'

import router from './router'
import store from './store'

// 导入全局的svg图标
import svgIcon from '@/components/SvgIcon/index.vue'

const app = createApp(App)
// 自定义引入svg组件
app.component('svg-icon', svgIcon)

// import './permission'
// 全局注册`@iconify/vue`图标库
import { IconifyIconOffline, IconifyIconOnline, FontIcon } from './components/ReIcon'
app.component('IconifyIconOffline', IconifyIconOffline)
app.component('IconifyIconOnline', IconifyIconOnline)
app.component('FontIcon', FontIcon)

app.config.errorHandler = (err, vm, info) => {
  // handle error
  console.log('[全局异常]', err, vm, info)
}
import './permission'

const setupAll = async () => {
  await setupI18n(app)
  app
    .use(ElementPlus, { zIndex: 3000 })
    // .use(useElementPlus)
    .use(router)
    .use(store)
    .use(MotionPlugin)
  app.mount('#app')
}

setupAll()
