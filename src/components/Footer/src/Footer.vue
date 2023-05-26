<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app'
import { computed } from 'vue'

const appStore = useAppStore()

const title = computed(() => appStore.getTitle)
</script>

<template>
  <div
    class="v-footer text-center text-[var(--el-text-color-placeholder)] bg-[var(--app-content-bg-color)] h-[var(--app-footer-height)] leading-[var(--app-footer-height)] dark:bg-[var(--el-bg-color)]">
    Copyright ©2023-present {{ title }}
  </div>
</template>
