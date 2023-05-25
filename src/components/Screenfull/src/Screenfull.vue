<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { propTypes } from '@/utils/propTypes'

defineProps({
  color: propTypes.string.def('')
})

const { toggle, isFullscreen } = useFullscreen()

const toggleFullscreen = () => {
  toggle()
}
</script>

<template>
  <div class="v-screenfull" @click="toggleFullscreen">
    <el-icon>
      <svg-icon :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" :color="color" />
    </el-icon>
  </div>
</template>
