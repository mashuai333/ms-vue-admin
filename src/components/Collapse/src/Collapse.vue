<script setup lang="ts">
import { computed, unref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import propTypes from '@/utils/propTypes'

defineProps({
  color: propTypes.string.def('')
})

const appStore = useAppStore()

const collapse = computed(() => appStore.getCollapse)

const toggleCollapse = () => {
  const collapsed = unref(collapse)
  appStore.setCollapse(!collapsed)
}
</script>

<template>
  <div class="v-collapse">
    <IconifyIconOnline
      :icon="collapse ? 'ant-design:menu-unfold-outlined' : 'ant-design:menu-fold-outlined'"
      :color="color"
      class="cursor-pointer text-lg"
      @click="toggleCollapse" />
  </div>
</template>
