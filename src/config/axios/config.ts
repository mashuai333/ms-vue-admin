const config: {
  base_url: {
    dev: string
    test: string
    pro: string
  }
  result_code: number | string
  fail_result_code: number | string
  default_headers: AxiosHeaders
  request_timeout: number
} = {
  /**
   * api请求基础路径
   */
  base_url: {
    // 开发环境接口前缀
    dev: '/',
    // 测试环境接口前缀
    test: '/app',
    // 打包生产环境接口前缀
    pro: '/app'
  },

  /**
   * 接口成功返回状态码
   */
  result_code: 200,

  /**
   * 接口失败返回状态码
   */
  fail_result_code: 201,

  /**
   * 接口请求超时时间
   */
  request_timeout: 0,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: 'application/json'
}

export { config }
