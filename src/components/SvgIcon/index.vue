<template>
  <svg :class="svgClass" v-bind="$attrs" :size="size" :style="{ color: color }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

export interface IconTypes {
  icon: string
  color?: string
  size?: number
}

// 运行时声明
// const props = defineProps({
//   icon: {
//     type: String,
//     required: true
//   },
//   color: {
//     type: String,
//     default: ''
//   },
//   size: {
//     type: Number,
//     default: 16
//   }
// })

// 基于类型声明
const props = withDefaults(defineProps<IconTypes>(), {
  icon: '',
  color: '',
  size: 16
})

const iconName = computed(() => `#icon-${props.icon}`)
const svgClass = computed(() => {
  if (props.icon) {
    return `svg-icon icon-${props.icon}`
  }
  return 'svg-icon'
})
</script>

<style lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentcolor;
  vertical-align: middle;
}
</style>
