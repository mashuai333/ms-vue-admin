import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { useLocaleStoreHook } from '@/store/modules/locale'
import type { I18n, I18nOptions } from 'vue-i18n'

import { setHtmlPageLang } from './helper'

export let i18n: ReturnType<typeof createI18n>
const createI18nOptions = async (): Promise<I18nOptions> => {
  const localeStore = useLocaleStoreHook()
  const locale = localeStore.getCurrentLocale
  const localeMap = localeStore.getLocaleMap
  const defaultLocal = await import(`../../../locales/${locale.lang}.yaml`)
  const message = defaultLocal.default ?? {}
  console.log(localeMap, 'localeMap')
  console.log(defaultLocal, 'defaultLocal')
  console.log(message, 'message')
  setHtmlPageLang(locale.lang)

  localeStore.setCurrentLocale({
    lang: locale.lang
    // elLocale: elLocal
  })

  return {
    legacy: false,
    locale: locale.lang,
    fallbackLocale: locale.lang,
    messages: {
      [locale.lang]: message
    },
    availableLocales: localeMap.map(v => v.lang),
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true
  }
}

export const setupI18n = async (app: App<Element>) => {
  const options = await createI18nOptions()
  i18n = createI18n(options) as I18n
  app.use(i18n)
}

// function getLocalePlugin(prefix = 'zh-CN') {
//   return Object.fromEntries(
//     Object.entries(import.meta.glob('../../../locales/^.y(a)?ml$', { eager: true })).map(
//       ([key, value]: any) => {
//         const name = key.match(/([A-Za-z0-9-_]+)\./i)?.[1]
//         return [name, value.default]
//       }
//     )
//   )[prefix]
// }
// const localeStore = useLocaleStoreHook()
// const locale = localeStore.getCurrentLocale
// export const messages = {
//   ['zh-CN']: {
//     ...getLocalePlugin('zh-CN'),
//     ...elLocaleMap['zh-CN']
//   },
//   en: {
//     ...getLocalePlugin('en'),
//     ...elLocaleMap['en']
//   }
// }

// export const i18n: I18n = createI18n({
//   legacy: false,
//   locale: locale.lang,
//   fallbackLocale: 'zh-CN',
//   messages,
//   // availableLocales: localeMap.map(v => v.lang),
//   sync: true
//   // silentTranslationWarn: true,
//   // missingWarn: false,
//   // silentFallbackWarn: true
// })

// /**
//  * 国际化转换工具函数（自动读取根目录locales文件夹下文件进行国际化匹配）
//  * @param message message
//  * @returns 转化后的message
//  */
// export function transformI18n(message: any = '') {
//   if (!message) {
//     return ''
//   }

//   // 处理存储动态路由的title,格式 {zh:"",en:""}
//   if (typeof message === 'object') {
//     const locale: string <string> | any = i18n.global.locale
//     return message[locale?.value]
//   }

//   const key = message.match(/(\S*)\./)?.[1]
//   if (key && Object.keys(getLocalePlugin('zh-CN')).includes(key)) {
//     return i18n.global.t.call(i18n.global.locale, message)
//   } else if (!key && Object.keys(getLocalePlugin('zh-CN')).includes(message)) {
//     // 兼容非嵌套形式的国际化写法
//     return i18n.global.t.call(i18n.global.locale, message)
//   } else {
//     return message
//   }
// }

// export const setupI18n = (app: App) => {
//   console.log(i18n, 'i18n')
//   console.log(messages, 'messages')
//   app.use(i18n)
// }
