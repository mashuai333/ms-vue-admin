<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import Motion from '../utils/motion'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { useVerifyCode } from '../utils/verifyCode'
import { updateRules } from '../utils/rule'
import { useUserStoreHook } from '@/store/modules/user'
import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import Lock from '@iconify-icons/ri/lock-fill'
import Iphone from '@iconify-icons/ep/iphone'
import User from '@iconify-icons/ri/user-3-fill'

const { t } = useI18n()

const checked = ref(false)
const loading = ref(false)
const ruleForm = reactive({
  username: '',
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

const loginRegister = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (checked.value) {
        // 模拟请求，需根据实际开发进行修改
        setTimeout(() => {
          ElMessage.success(t('login.registerSuccess'))
          loading.value = false
          toLogin()
        }, 2000)
      } else {
        loading.value = false
        ElMessage.warning(t('login.tickPrivacy'))
      }
    } else {
      loading.value = false
      return fields
    }
  })
}

const toLogin = () => {
  useVerifyCode().end()
  useUserStoreHook().SET_CURRENTPAGE(0)
}
</script>

<template>
  <div>
    <div class="flex-c mb-3">
      <h2 class="text-2xl font-bold text-center">{{ t('login.register') }}</h2>
    </div>
    <el-form
      ref="ruleFormRef"
      class="w-[350px]"
      :model="ruleForm"
      :rules="updateRules"
      size="large">
      <Motion>
        <el-form-item
          :rules="[
            {
              required: true,
              message: t('login.usernameReg'),
              trigger: 'blur'
            }
          ]"
          prop="username">
          <el-input
            clearable
            v-model="ruleForm.username"
            :placeholder="t('login.username')"
            :prefix-icon="useRenderIcon(User)" />
        </el-form-item>
      </Motion>

      <Motion :delay="100">
        <el-form-item prop="phone">
          <el-input
            clearable
            v-model="ruleForm.phone"
            :placeholder="t('login.phone')"
            :prefix-icon="useRenderIcon(Iphone)" />
        </el-form-item>
      </Motion>

      <Motion :delay="150">
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
      <Motion :delay="200">
        <el-form-item prop="password">
          <el-input
            clearable
            show-password
            v-model="ruleForm.password"
            :placeholder="t('login.password')"
            :prefix-icon="useRenderIcon(Lock)" />
        </el-form-item>
      </Motion>

      <Motion :delay="250">
        <el-form-item :rules="repeatPasswordRule" prop="repeatPassword">
          <el-input
            clearable
            show-password
            v-model="ruleForm.repeatPassword"
            :placeholder="t('login.sure')"
            :prefix-icon="useRenderIcon(Lock)" />
        </el-form-item>
      </Motion>

      <Motion :delay="300">
        <el-form-item>
          <el-checkbox v-model="checked">
            {{ t('login.readAccept') }}
          </el-checkbox>
          <el-button link type="primary">
            {{ t('login.privacyPolicy') }}
          </el-button>
        </el-form-item>
      </Motion>

      <Motion :delay="350">
        <el-form-item>
          <el-button
            class="w-full"
            size="default"
            type="primary"
            :loading="loading"
            @click="loginRegister(ruleFormRef)">
            {{ t('login.register') }}
          </el-button>
        </el-form-item>
      </Motion>

      <Motion :delay="400">
        <el-form-item>
          <el-button class="w-full" size="default" @click="toLogin">
            {{ t('login.hasUser') }}
          </el-button>
        </el-form-item>
      </Motion>
    </el-form>
  </div>
</template>
