import variables from '@/styles/var.module.scss'
export const useDesign = () => {
  const sassVariables = variables

  /**
   * @param scope 类名
   * @returns 返回空间名-类名
   */
  const getPrefixCls = (scope: string) => {
    return `${sassVariables.namespace}-${scope}`
  }

  return {
    variables: sassVariables,
    getPrefixCls
  }
}
