import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError
} from 'axios'
import qs from 'qs'
import { config } from './config'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/modules/user'
import myCookies from '@/utils/customCookies'
import router from '@/router'
import { useDebounceFn } from '@vueuse/core'

const { result_code, fail_result_code, base_url } = config
export const PATH_URL = base_url[import.meta.env.VITE_API_BASEPATH]

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: config.request_timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (
      config.method === 'post' &&
      (config.headers as AxiosRequestHeaders)['Content-Type'] ===
        'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(config.data)
    }
    const token = myCookies.get('token')
    if (token) {
      ;(config.headers as AxiosRequestHeaders)['token'] = token
    }
    // get参数编码
    if (config.method === 'get' && config.params) {
      let url = config.url as string
      url += '?'
      const keys = Object.keys(config.params)
      for (const key of keys) {
        if (config.params[key] !== void 0 && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`
        }
      }
      url = url.substring(0, url.length - 1)
      config.params = {}
      config.url = url
    }
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const {
      data: { code, data, message }
    } = response
    // 登录code码 :401 用户名为空或密码为空
    // 402 用户名错误或密码错误
    // 403 用户不可用 无法登录
    // 404 token不存在，过期
    // 导出  405, "文件下载失败"
    // 导入  406, "文件读取失败"
    // 导入  407, "文件类型不符合请重新选择"
    // 正常 20000
    // 失败 20001
    // warning提示 20002
    // 处理设备周期启用停用状态提示 20003
    if (response.config.responseType === 'blob') {
      // 如果是文件流，直接过
      return response
    } else if (code === result_code) {
      return data
    } else if (code === fail_result_code) {
      ElMessage.error(message)
      return Promise.reject(response)
    } else if (code === 20003) {
      ElMessage.warning(message)
      return response.data
    } else if (code === 401 || code === 402 || code === 403) {
      return message
    } else if (code === 404) {
      // 登录定义状态 token过期
      useDebounceFn(() => {
        const userStore = useUserStore()
        userStore.resetCookies()
        ElMessage({
          message: message,
          duration: 2000,
          type: 'warning',
          showClose: true
        })
        router.push({ path: '/thirdLogin' })
      }, 1500)
      return Promise.resolve(response)
    } else {
      //20002
      ElMessage.warning(message)
      return Promise.reject()
    }
  },
  (error: AxiosError) => {
    console.log('err' + error) // for debug
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export { service }
