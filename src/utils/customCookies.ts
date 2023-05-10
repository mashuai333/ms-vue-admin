import Cookies from 'js-cookie'
// 统一domain path
const keyBefore = 'dzRailway_'
const myCookies = {
  set: function (key: string, value: any, expires?: number) {
    Cookies.set(`${keyBefore}${key}`, value, { expires })
  },
  get: function (key: string) {
    const getKey = Cookies.get(`${keyBefore}${key}`)
    return getKey
  },
  remove: function (key: string) {
    Cookies.remove(`${keyBefore}${key}`)
  }
}
export default myCookies
