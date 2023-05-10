<template>
  <div id="zoom-container" ref="zoomContainer">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted, toRefs, onBeforeUnmount } from 'vue'
const props = defineProps({
  width: {
    type: Number,
    default: 1920
  },
  height: {
    type: Number,
    default: 1080
  }
})

const state = reactive({
  width: 0, // 大屏真实宽度
  height: 0, // 大屏真实高度
  originalWidth: 0, // 窗口原始宽度
  originalHeight: 0, // 窗口原始高度
  zoomContainer: null
})

const { zoomContainer, width, height, originalWidth, originalHeight } = toRefs(state)

const Debounce = (fn: Function, t: number) => {
  const delay = t || 500
  let timer: any
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    const context = this
    timer = setTimeout(() => {
      timer = null
      fn.apply(context, args)
    }, delay)
  }
}
const initSize = () => {
  return new Promise<void>(resolve => {
    if (props.width && props.height) {
      width.value = props.width
      height.value = props.height
    } else {
      // 若未传递大屏真实尺寸，则获取容器被内容撑满后的尺寸 作为大屏真实尺寸
      width.value = zoomContainer.value.clientWidth
      height.value = zoomContainer.value.clientHeight
    }
    // 获取窗口原始尺寸
    if (!originalWidth.value || !originalHeight.value) {
      originalWidth.value = window.screen.width
      originalHeight.value = window.screen.height
    }
    resolve()
  })
}
const updateSize = () => {
  if (width.value && height.value) {
    zoomContainer.value.style.width = `${width.value}px`
    zoomContainer.value.style.height = `${height.value}px`
  }
}
const updateScale = () => {
  // 屏幕视口存在认为缩放，拖动，导致真实视口发生变化，这里获取真实的视口尺寸
  const currentWidth = document.body.clientWidth
  const currentHeight = document.body.clientHeight
  // 获取大屏最终宽高， 若未获得大屏幕尺寸，则将屏幕视口原始尺寸作为大屏最终宽高
  const realWidth = width.value || originalWidth.value
  const realHeight = height.value || originalHeight.value
  // 计算宽高比
  const widthScale = currentWidth / realWidth
  const heightScale = currentHeight / realHeight
  if (zoomContainer.value)
    zoomContainer.value.style.transform = `scale(${widthScale}, ${heightScale})`
}
// 监听 resize 事件， 动态更新容器缩放比
const onResize = async () => {
  initSize()
  updateScale()
}
onMounted(async () => {
  await initSize()
  //设置容器尺寸，让容器尺寸与内容尺寸一致
  updateSize()
  // 设置容器缩放比例，实现内容一屏完整显示
  updateScale()
  // 监听 resize事件，实现页面动态适配
  window.addEventListener('resize', Debounce(onResize, 1000))
})
onBeforeUnmount(() => {
  // 页面销毁前 移除 resize 事件监听
  window.removeEventListener('resize', Debounce(onResize, 1000))
})
</script>
<style lang="scss" scoped>
#zoom-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  transform-origin: left top;
}
</style>
