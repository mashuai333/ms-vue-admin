<script setup lang="ts">
import { PropType, watch, unref, ref } from 'vue'
import propTypes from '@/utils/propTypes'
import { IconifyIconOnline } from '@/components/ReIcon'

const props = defineProps({
  schema: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  modelValue: propTypes.string.def('')
})

const emit = defineEmits(['update:modelValue', 'change'])

const colorVal = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val: string) => {
    if (val === unref(colorVal)) return
    colorVal.value = val
  }
)

// 监听
watch(
  () => colorVal.value,
  (val: string) => {
    emit('update:modelValue', val)
    emit('change', val)
  }
)
</script>

<template>
  <div class="v-color-radio-picker flex flex-wrap space-x-4">
    <span
      v-for="(item, i) in schema"
      :key="`radio-${i}`"
      class="w-[20px] h-[20px] cursor-pointer rounded-2px border-solid border-gray-300 border-2 text-center leading-20px mb-5px"
      :class="{ 'is-active': colorVal === item }"
      :style="{
        background: item
      }"
      @click="colorVal = item">
      <IconifyIconOnline v-if="colorVal === item" color="#fff" icon="ep:check" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.v-color-radio-picker {
  .is-active {
    border-color: var(--el-color-primary);
  }
}
</style>
