<script setup lang="ts">
import { ref, reactive } from 'vue'
import Motion from '../utils/motion'
import { phoneRules } from '../utils/rule'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useVerifyCode } from '../utils/verifyCode'
import { useUserStoreHook } from '@/store/modules/user'
import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import Iphone from '@iconify-icons/ep/iphone'

const { t } = useI18n()
const loading = ref(false)
const ruleForm = reactive({
  phone: '',
  verifyCode: ''
})
const ruleFormRef = ref<FormInstance>()
const { isDisabled, text } = useVerifyCode()

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 模拟登录请求，需根据实际开发进行修改
      setTimeout(() => {
        ElMessage.success(t('login.loginSuccess'))
        loading.value = false
      }, 2000)
    } else {
      loading.value = false
      return fields
    }
  })
}

function onBack() {
  useVerifyCode().end()
  useUserStoreHook().SET_CURRENTPAGE(0)
}
</script>

<template>
  <div>
    <div class="flex-c mb-3">
      <h2 class="text-2xl font-bold text-center">{{ t('login.phoneLogin') }}</h2>
    </div>
    <el-form ref="ruleFormRef" class="w-[350px]" :model="ruleForm" :rules="phoneRules" size="large">
      <Motion>
        <el-form-item prop="phone">
          <el-input
            clearable
            v-model="ruleForm.phone"
            :placeholder="t('login.phone')"
            :prefix-icon="useRenderIcon(Iphone)" />
        </el-form-item>
      </Motion>

      <Motion :delay="100">
        <el-form-item prop="verifyCode">
          <div class="w-full flex justify-between">
            <el-input
              clearable
              v-model="ruleForm.verifyCode"
              :placeholder="t('login.smsVerifyCode')"
              :prefix-icon="useRenderIcon('ri:shield-keyhole-line')" />
            <el-button
              :disabled="isDisabled"
              class="ml-2"
              @click="useVerifyCode().start(ruleFormRef, 'phone')">
              {{ text.length > 0 ? text + t('login.info') : t('login.getVerifyCode') }}
            </el-button>
          </div>
        </el-form-item>
      </Motion>

      <Motion :delay="150">
        <el-form-item>
          <el-button
            class="w-full"
            size="default"
            type="primary"
            :loading="loading"
            @click="onLogin(ruleFormRef)">
            {{ t('login.login') }}
          </el-button>
        </el-form-item>
      </Motion>

      <Motion :delay="200">
        <el-form-item>
          <el-button class="w-full" size="default" @click="onBack">
            {{ t('login.back') }}
          </el-button>
        </el-form-item>
      </Motion>
    </el-form>
  </div>
</template>
