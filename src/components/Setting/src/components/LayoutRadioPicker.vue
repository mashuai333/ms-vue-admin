<script setup lang="ts">
import { useAppStoreHook } from '@/store/modules/app'
import { computed } from 'vue'

const appStore = useAppStoreHook()

const layout = computed(() => appStore.getLayout)
</script>

<template>
  <div class="v-layout-radio-picker flex flex-wrap space-x-3">
    <div
      :class="[
        `v-layout-radio-picker__classic`,
        'relative w-[56px] h-[48px] cursor-pointer bg-gray-300',
        {
          'is-acitve': layout === 'classic'
        }
      ]"
      @click="appStore.setLayout('classic')" />
    <div
      :class="[
        `v-layout-radio-picker__top-left`,
        'relative w-[56px] h-[48px] cursor-pointer bg-gray-300',
        {
          'is-acitve': layout === 'topLeft'
        }
      ]"
      @click="appStore.setLayout('topLeft')" />
    <div
      :class="[
        `v-layout-radio-picker__top`,
        'relative w-[56px] h-[48px] cursor-pointer bg-gray-300',
        {
          'is-acitve': layout === 'top'
        }
      ]"
      @click="appStore.setLayout('top')" />
    <div
      :class="[
        `v-layout-radio-picker__cut-menu`,
        'relative w-[56px] h-[48px] cursor-pointer bg-gray-300',
        {
          'is-acitve': layout === 'cutMenu'
        }
      ]"
      @click="appStore.setLayout('cutMenu')">
      <div class="absolute h-full w-[33%] top-0 left-[10%] bg-gray-200" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-layout-radio-picker {
  &__classic {
    border: 2px solid #e5e7eb;
    border-radius: 4px;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 33%;
      height: 100%;
      background-color: #273352;
      border-radius: 4px 0 0 4px;
      content: '';
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 25%;
      background-color: #fff;
      border-radius: 4px 4px 0;
      content: '';
    }
  }

  &__top-left {
    border: 2px solid #e5e7eb;
    border-radius: 4px;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 33%;
      background-color: #273352;
      border-radius: 4px 4px 0 0;
      content: '';
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 33%;
      height: 100%;
      background-color: #fff;
      border-radius: 4px 0 0 4px;
      content: '';
    }
  }

  &__top {
    border: 2px solid #e5e7eb;
    border-radius: 4px;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 33%;
      background-color: #273352;
      border-radius: 4px 4px 0 0;
      content: '';
    }
  }

  &__cut-menu {
    border: 2px solid #e5e7eb;
    border-radius: 4px;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 33%;
      background-color: #273352;
      border-radius: 4px 4px 0 0;
      content: '';
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 10%;
      height: 100%;
      background-color: #fff;
      border-radius: 4px 0 0 4px;
      content: '';
    }
  }

  .is-acitve {
    border-color: var(--el-color-primary);
  }
}
</style>
