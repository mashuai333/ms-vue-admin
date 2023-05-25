import Vue, { VNode } from 'vue'

declare module '*.tsx' {
  import Vue from 'compatible-vue'
  export default Vue
}

import Vue, { VNode } from 'vue'
declare global {
  declare module '*.tsx' {
    import Vue from 'compatible-vue'
    export default Vue
  }
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface ElementAttributesProperty {
      $props: any
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
    interface IntrinsicAttributes {
      [elem: string]: any
    }
  }
}
