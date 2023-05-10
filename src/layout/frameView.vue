<template>
  <div>
    <topHeader />
    <div class="main-container">
      <div class="frame" v-loading="loading">
        <iframe :src="frameSrc" class="frame-iframe" ref="frameRef" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import topHeader from './topHeader/index.vue'

import { useRoute } from 'vue-router'
import { ref, unref, onMounted, nextTick, watch } from 'vue'

const loading = ref(true)
const currentRoute = useRoute()
const frameSrc = ref<string>('')
const frameRef = ref<HTMLElement | null>(null)

if (unref(currentRoute.meta)?.frameSrc) {
  frameSrc.value = unref(currentRoute.meta)?.frameSrc as string
}

function hideLoading() {
  loading.value = false
}

watch(
  () => unref(currentRoute.meta)?.frameSrc,
  val => {
    frameSrc.value = val as string
    init()
  }
)

function init() {
  nextTick(() => {
    const iframe = unref(frameRef)
    if (!iframe) return
    const _frame = iframe as any
    if (_frame.attachEvent) {
      _frame.attachEvent('onload', () => {
        hideLoading()
      })
    } else {
      iframe.onload = () => {
        hideLoading()
      }
    }
  })
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
.frame {
  z-index: 998;
  height: calc(100vh - 50px);

  .frame-iframe {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 0;
  }
}
</style>
