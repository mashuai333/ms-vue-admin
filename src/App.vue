<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useLocaleStoreHook } from '@/store/modules/locale'
import { elLocaleMap } from '@/store/modules/locale'
const currentLocale = computed(() => {
  return elLocaleMap[useLocaleStoreHook().getCurrentLocale.lang]
})
</script>
