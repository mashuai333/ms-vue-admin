<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
import { ref, reactive } from 'vue'
import Motion from '../utils/motion'
import { ElMessage } from 'element-plus'
import { updateRules } from '../utils/rule'
import type { FormInstance } from 'element-plus'
import { useVerifyCode } from '../utils/verifyCode'
import { useUserStoreHook } from '@/store/modules/user'
import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import Lock from '@iconify-icons/ri/lock-fill'
import Iphone from '@iconify-icons/ep/iphone'

const { t } = useI18n()
const loading = ref(false)
const ruleForm = reactive({
  phone: '',
  verifyCode: '',
  password: '',
  repeatPassword: ''
})
const ruleFormRef = ref<FormInstance>()
const { isDisabled, text } = useVerifyCode()
const repeatPasswordRule = [
  {
    validator: (rule, value, callback) => {
      if (value === '') {
        callback(new Error(t('login.passwordSureReg')))
      } else if (ruleForm.password !== value) {
        callback(new Error(t('login.passwordDifferentReg')))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }
]

const onUpdate = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 模拟请求，需根据实际开发进行修改
      setTimeout(() => {
        ElMessage.success(t('login.passwordUpdateReg'))
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
      <h2 class="text-2xl font-bold text-center">{{ t('login.forgetPass') }}</h2>
    </div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="updateRules" size="large">
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
        <el-form-item prop="password">
          <el-input
            clearable
            show-password
            v-model="ruleForm.password"
            :placeholder="t('login.password')"
            :prefix-icon="useRenderIcon(Lock)" />
        </el-form-item>
      </Motion>

      <Motion :delay="200">
        <el-form-item :rules="repeatPasswordRule" prop="repeatPassword">
          <el-input
            clearable
            show-password
            v-model="ruleForm.repeatPassword"
            :placeholder="t('login.sure')"
            :prefix-icon="useRenderIcon(Lock)" />
        </el-form-item>
      </Motion>

      <Motion :delay="250">
        <el-form-item>
          <el-button
            class="w-full"
            size="default"
            type="primary"
            :loading="loading"
            @click="onUpdate(ruleFormRef)">
            {{ t('login.definite') }}
          </el-button>
        </el-form-item>
      </Motion>

      <Motion :delay="300">
        <el-form-item>
          <el-button class="w-full" size="default" @click="onBack">
            {{ t('login.back') }}
          </el-button>
        </el-form-item>
      </Motion>
    </el-form>
  </div>
</template>
