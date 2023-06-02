<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Motion from '../utils/motion'
import ReQrcode from '@/components/ReQrcode'
import { useUserStoreHook } from '@/store/modules/user'

const { t } = useI18n()
</script>

<template>
  <div>
    <div class="flex-c mb-3">
      <h2 class="text-2xl font-bold text-center">{{ t('login.qRCodeLogin') }}</h2>
    </div>
    <Motion class="-mt-2 -mb-2 text-center"> <ReQrcode :text="t('login.test')" /> </Motion>
    <Motion :delay="100">
      <el-divider>
        <p class="text-gray-500 text-xs">{{ t('login.tip') }}</p>
      </el-divider>
    </Motion>
    <Motion :delay="150">
      <el-button class="w-full mt-4" @click="useUserStoreHook().SET_CURRENTPAGE(0)">
        {{ t('login.back') }}
      </el-button>
    </Motion>
  </div>
</template>
