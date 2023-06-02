import type { ECharts } from 'echarts'
/**
 * 全局类型声明，无需引入直接在 `.vue` 、`.ts` 、`.tsx` 文件使用即可获得类型提示
 */
declare global {
  /**
   * 平台的名称、版本、依赖、最后构建时间的类型提示
   */
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Recordable<string>
      devDependencies: Recordable<string>
    }
    lastBuildTime: string
  }

  declare type AxiosHeaders =
    | 'application/json'
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'

  declare type AxiosMethod = 'get' | 'post' | 'delete' | 'put'

  declare type AxiosResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

  declare interface AxiosConfig {
    params?: any
    data?: any
    url?: string
    method?: AxiosMethod
    headersType?: string
    responseType?: AxiosResponseType
  }

  declare interface IResponse<T = any> {
    code: number
    message: string
    data: T extends any ? T : T & any
  }

  // declare interface IResponse<T = any> {
  //   orgList?: T extends any ? T : T & any //可能返回的包装key
  //   pageModel?: T extends any ? T : T & any //可能返回的包装key
  //   list?: T extends any ? T : T & any //可能返回的包装key
  //   report?: T extends any ? T : T & any //可能返回的包装key
  //   playbackResult?: T extends any ? T : T & any //可能返回的包装key
  //   warnList?: T extends any ? T : T & any //可能返回的包装key
  //   violateList?: T extends any ? T : T & any //可能返回的包装key
  //   userInfo?: T extends any ? T : T & any //可能返回的包装key
  //   lineEquipmentNumber?: T extends any ? T : T & any //可能返回的包装key
  //   token?: string
  //   name?: string
  //   [propName: string]: any
  // }

  /**
   * 打包压缩格式的类型声明
   */
  type ViteCompression =
    | 'none'
    | 'gzip'
    | 'brotli'
    | 'both'
    | 'gzip-clear'
    | 'brotli-clear'
    | 'both-clear'

  /**
   * 全局自定义环境变量的类型声明
   *VITE_PORT 平台本地运行端口号
   *VITE_PUBLIC_PATH 部署应用包时的基本 URL
   *VITE_ROUTER_HISTORY 路由模式（Hash模式传"hash"、HTML5模式传"h5"、Hash模式带base参数传"hash,base参数"、HTML5模式带base参数传"h5,base参数"）
   *VITE_CDN 是否使用CDN
   *VITE_HIDE_HOME
  # 是否启用gzip压缩或brotli压缩（分两种情况，删除原始文件和不删除原始文件）
  # 压缩时不删除原始文件的配置：gzip、brotli、both（同时开启 gzip 与 brotli 压缩）、none（不开启压缩，默认）
  # 压缩时删除原始文件的配置：gzip-clear、brotli-clear、both-clear（同时开启 gzip 与 brotli 压缩）、none（不开启压缩，默认）
   *VITE_COMPRESSION
   */
  interface ViteEnv {
    VITE_PORT: number
    VITE_PUBLIC_PATH: string
    VITE_ROUTER_HISTORY: string
    VITE_CDN: boolean
    VITE_HIDE_HOME: string
    VITE_COMPRESSION: ViteCompression
  }

  declare type LocaleType = 'zh-CN' | 'en'
  /**
   * 平台里所有组件实例都能访问到的全局属性对象的类型声明
   */
  interface GlobalPropertiesApi {
    $echarts: ECharts
  }
}
