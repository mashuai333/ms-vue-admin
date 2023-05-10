import request from '@/config/axios'

/**
 * 探伤内容
 * @param data
 * 探伤内容：TS_CONTENT；
 * 工单状态：TASK_STATUS;
 * 伤损信息来源;RFI_SOURCE
 * 报告状态：REPORT_STATUS；
 * 回放报告状态：PB_STATUS;
 * 伤损类型：FLAW_TYPE
 * 报警等级：WARN_RANK
 * 伤损程度：FLAW_DEGREE
 * @returns
 */
export const queryDetectContent = (type: string): Promise<IResponse> => {
  return request.get({ url: `/sys/dic/findByKey/${type}` })
}
