<script setup lang="ts">
import { computed } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { useAppStore } from '@/store/modules/app'
import { useI18n } from '@/hooks/web/useI18n'
import propTypes from '@/utils/propTypes'
import { ElementPlusSize } from '@/types/elementPlus'

defineProps({
  color: propTypes.string.def('')
})

const { t } = useI18n()

const appStore = useAppStore()

const sizeMap = computed(() => appStore.sizeMap)

const setCurrentSize = (size: ElementPlusSize) => {
  appStore.setCurrentSize(size)
}
</script>

<template>
  <ElDropdown class="v-size-dropdown" trigger="click" @command="setCurrentSize">
    <IconifyIconOnline icon="mdi:format-size" :color="color" class="cursor-pointer text-lg" />
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="item in sizeMap" :key="item" :command="item">
          {{ t(`size.${item}`) }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
