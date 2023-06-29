<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import Motion from '../utils/motion'
import type { FormInstance } from 'element-plus'
import { useAppStoreHook } from '@/store/modules/app'
import { useUserStoreHook } from '@/store/modules/user'
import { usePermissionStoreHook } from '@/store/modules/permission'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import { loginRules } from '../utils/rule'
import { operates, thirdParty } from '../utils/enums'
import { useCache } from '@/hooks/web/useCache'
import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import { ReImageVerify } from '@/components/ReImageVerify'

import { getTestRoleApi, getAdminRoleApi } from '@/api/login'

import Lock from '@iconify-icons/ri/lock-fill'
import User from '@iconify-icons/ri/user-3-fill'
// import { useValidator } from '@/utils/validate'
// const { required } = useValidator()

const ruleForm = reactive({
  username: 'admin',
  password: 'admin123',
  verifyCode: ''
})
const { t } = useI18n()
const { wsCache } = useCache()

const appStore = useAppStoreHook()
const permissionStore = usePermissionStoreHook()
const userStore = useUserStoreHook()

const currentPage = computed(() => {
  return userStore.currentPage
})

const { currentRoute, addRoute, push } = useRouter()

const checked = ref(false)
const loading = ref(false)
const ruleFormRef = ref<FormInstance>()
const redirect = ref<string>('')
const imgCode = ref('')

watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    redirect.value = route?.query?.redirect as string
  },
  {
    immediate: true
  }
)

// 登录
const signIn = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      userStore.loginByUsername(ruleForm).then(res => {
        if (res) {
          wsCache.set(appStore.getUserInfo, res)
          // 是否使用动态路由
          if (appStore.getDynamicRouter) {
            getRole()
          } else {
            permissionStore.generateRoutes('none').catch(() => {})
            permissionStore.getAddRouters.forEach(route => {
              addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
            })
            permissionStore.setIsAddRouters(true)
            push({ path: redirect.value || permissionStore.addRouters[0].path })
          }
        }
      })
    } else {
      loading.value = false
      return fields
    }
  })
}

// 获取角色信息
const getRole = async () => {
  const params = {
    roleName: ruleForm.username
  }
  // admin - 模拟后端过滤菜单
  // test - 模拟前端过滤菜单
  const res =
    ruleForm.username === 'admin' ? await getAdminRoleApi(params) : await getTestRoleApi(params)
  if (res) {
    const routers = res.data || []
    wsCache.set('roleRouters', routers)

    ruleForm.username === 'admin'
      ? await permissionStore.generateRoutes('admin', routers).catch(() => {})
      : await permissionStore.generateRoutes('test', routers).catch(() => {})

    permissionStore.getAddRouters.forEach(route => {
      addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
    })
    permissionStore.setIsAddRouters(true)
    push({ path: redirect.value || permissionStore.addRouters[0].path })
  }
}

watch(imgCode, value => {
  useUserStoreHook().SET_VERIFYCODE(value)
})
</script>

<template>
  <div>
    <div class="flex-c mb-3">
      <h2 class="text-2xl font-bold text-center">{{ t('login.login') }}</h2>
    </div>
    <el-form ref="ruleFormRef" class="w-[350px]" :model="ruleForm" :rules="loginRules" size="large">
      <Motion :delay="100">
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
        <el-form-item prop="verifyCode">
          <el-input
            clearable
            v-model="ruleForm.verifyCode"
            :placeholder="t('login.verifyCode')"
            :prefix-icon="useRenderIcon('ri:shield-keyhole-line')">
            <template v-slot:append>
              <ReImageVerify v-model:code="imgCode" />
            </template>
          </el-input>
        </el-form-item>
      </Motion>
      <Motion :delay="250">
        <el-form-item>
          <div class="w-full h-[20px] flex-bc">
            <el-checkbox v-model="checked">
              {{ t('login.remember') }}
            </el-checkbox>
            <el-button link type="primary" @click="userStore.SET_CURRENTPAGE(4)">
              {{ t('login.forget') }}
            </el-button>
          </div>
          <el-button
            class="w-full mt-3"
            size="default"
            type="primary"
            :loading="loading"
            @click="signIn(ruleFormRef)">
            {{ t('login.login') }}
          </el-button>
        </el-form-item>
      </Motion>

      <Motion :delay="300">
        <el-form-item>
          <div class="w-full flex-bc">
            <el-button
              v-for="(item, index) in operates"
              :key="index"
              class="w-full"
              size="default"
              @click="userStore.SET_CURRENTPAGE(index + 1)">
              {{ t(item.title) }}
            </el-button>
          </div>
        </el-form-item>
      </Motion>
    </el-form>
    <Motion v-if="currentPage === 0" :delay="350">
      <el-form-item>
        <el-divider>
          <p class="text-gray-500 text-xs">{{ t('login.thirdLogin') }}</p>
        </el-divider>
        <div class="w-full flex justify-evenly">
          <span v-for="(item, index) in thirdParty" :key="index" :title="t(item.title)">
            <IconifyIconOnline
              :icon="`ri:${item.icon}-fill`"
              width="20"
              class="cursor-pointer text-gray-500 hover:text-blue-400" />
          </span>
        </div>
      </el-form-item>
    </Motion>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-input-group__append) {
  padding: 0;
}
</style>
