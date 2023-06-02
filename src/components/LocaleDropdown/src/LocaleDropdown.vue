<script setup lang="ts">
import { computed, unref } from 'vue'
import { useLocaleStoreHook } from '@/store/modules/locale'
import propTypes from '@/utils/propTypes'
import Check from '@iconify-icons/ep/check'
import globalization from '@/assets/svgs/globalization.svg?component'

defineProps({
  color: propTypes.string.def('')
})

const localeStore = useLocaleStoreHook()

const langMap = computed(() => localeStore.getLocaleMap)
console.log(langMap.value, 'langMap')
const currentLang = computed(() => localeStore.getCurrentLocale)
console.log(currentLang.value, 'currentLang')
const setLang = (lang: LocaleType) => {
  if (lang === unref(currentLang).lang) return
  // 需要重新加载页面让整个语言多初始化
  window.location.reload()
  localeStore.setCurrentLocale({
    lang
  })
}
</script>

<template>
  <el-dropdown class="v-locale-dropdown" trigger="click" @command="setLang">
    <globalization
      class="hover:text-primary hover:!bg-[transparent] w-[20px] h-[20px] ml-1.5 cursor-pointer outline-none duration-300" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in langMap" :key="item.lang" :command="item.lang">
          <IconifyIconOffline
            class="check-zh"
            v-show="currentLang.lang === item.lang"
            :icon="Check" />
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
