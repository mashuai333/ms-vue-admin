import { createTypes, VueTypesInterface, VueTypeValidableDef, toValidableType } from 'vue-types'
import { CSSProperties } from 'vue'

// 自定义扩展vue-types
type PropTypes = VueTypesInterface & {
  readonly style: VueTypeValidableDef<CSSProperties>
}

const newPropTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined
}) as PropTypes

// 需要自定义扩展的类型
// 从 vue-types v5.0 开始，extend()方法已经废弃，当前已改为官方推荐的ES6+方法
// see: https://dwightjack.github.io/vue-types/advanced/extending-vue-types.html#the-extend-method

// newPropTypes.extend([
//   {
//     name: 'style',
//     getter: true,
//     type: [String, Object],
//     default: undefined
//   }
// ])
// export { newPropTypes as propTypes }
export default class propTypes extends newPropTypes {
  // a native-like validator that supports the `.validable` method
  static get style() {
    return toValidableType('style', {
      type: [String, Object]
    })
  }
}
