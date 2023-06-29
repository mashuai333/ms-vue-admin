<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import propTypes from '@/utils/propTypes'

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
    <IconifyIconOnline
      class="cursor-pointer text-lg"
      :icon="isFullscreen ? 'zmdi:fullscreen-exit' : 'zmdi:fullscreen'"
      :color="color" />
  </div>
</template>
