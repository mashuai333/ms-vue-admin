import type { ECharts } from "echarts";
/**
 * 全局类型声明，无需引入直接在 `.vue` 、`.ts` 、`.tsx` 文件使用即可获得类型提示
 */
declare global {
  /**
   * 平台的名称、版本、依赖、最后构建时间的类型提示
   */
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };

  declare type AxiosHeaders =
    | "application/json"
    | "application/x-www-form-urlencoded"
    | "multipart/form-data";

  declare type AxiosMethod = "get" | "post" | "delete" | "put";

  declare type AxiosResponseType =
    | "arraybuffer"
    | "blob"
    | "document"
    | "json"
    | "text"
    | "stream";

  declare interface AxiosConfig {
    params?: any;
    data?: any;
    url?: string;
    method?: AxiosMethod;
    headersType?: string;
    responseType?: AxiosResponseType;
  }

  // declare interface IResponse<T = any> {
  //   code: number;
  //   message: string;
  //   data: T extends any ? T : T & any;
  // }

  declare interface IResponse<T = any> {
    orgList?: T extends any ? T : T & any; //可能返回的包装key
    pageModel?: T extends any ? T : T & any; //可能返回的包装key
    list?: T extends any ? T : T & any; //可能返回的包装key
    report?: T extends any ? T : T & any; //可能返回的包装key
    playbackResult?: T extends any ? T : T & any; //可能返回的包装key
    warnList?: T extends any ? T : T & any; //可能返回的包装key
    violateList?: T extends any ? T : T & any; //可能返回的包装key
    userInfo?: T extends any ? T : T & any; //可能返回的包装key
    lineEquipmentNumber?: T extends any ? T : T & any; //可能返回的包装key
    token?: string;
    name?: string;
    [propName: string]: any;
  }
  /**
   * 平台里所有组件实例都能访问到的全局属性对象的类型声明
   */
  interface GlobalPropertiesApi {
    $echarts: ECharts;
  }
}
