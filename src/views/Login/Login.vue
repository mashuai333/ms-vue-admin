<script setup lang="ts">
// import { LoginForm, RegisterForm } from './components'
import { ThemeSwitch } from '@/components/ThemeSwitch'
// import { LocaleDropdown } from '@/components/LocaleDropdown'
// import { useI18n } from '@/hooks/web/useI18n'
import { underlineToHump } from '@/utils'
import { useAppStore } from '@/stores/modules/app'
// import { ref } from 'vue'

const appStore = useAppStore()

// const { t } = useI18n()

// const isLogin = ref(true)

// const toRegister = () => {
//   isLogin.value = false
// }

// const toLogin = () => {
//   isLogin.value = true
// }
</script>

<template>
  <div class="v-login select-none relative xl:bg-v-dark sm:px-10px xl:px-10px md:px-10px">
    <div class="relative flex mx-auto">
      <div class="v-login__left h-screen flex-1 bg-gray-500 bg-opacity-20 relative p-5 xl:hidden">
        <div class="flex items-center relative text-white">
          <img src="@/assets/logo.png" alt="" class="w-12 h-12 mr-3" />
          <span class="text-xl font-bold">{{ underlineToHump(appStore.getTitle) }}</span>
        </div>
        <div class="flex-c h-[calc(100%-88px)]">
          <TransitionGroup
            appear
            tag="div"
            enter-active-class="animate__animated animate__bounceInLeft">
            <img src="../../assets/svgs/login-box-bg.svg" key="1" alt="" class="w-80" />
            <div class="text-3xl text-white" key="2">欢迎使用本系统</div>
            <div class="mt-5 font-normal text-white text-14px" key="3"> 中后台管理系统 </div>
          </TransitionGroup>
        </div>
      </div>
      <div class="flex-1 p-7 <sm:p-10px dark:bg-v-dark relative">
        <div class="flex justify-between items-center text-white @2xl:justify-end @xl:justify-end">
          <div class="flex items-center @2xl:hidden @xl:hidden">
            <img src="@/assets/logo.png" alt="" class="w-12 h-12 mr-3" />
            <span class="text-xl font-bold">{{ underlineToHump(appStore.getTitle) }}</span>
          </div>

          <div class="flex justify-end items-center space-x-10px">
            <ThemeSwitch />
            <!-- <LocaleDropdown class="<xl:text-white dark:text-white" /> -->
          </div>
        </div>
        <Transition appear enter-active-class="animate__animated animate__bounceInRight">
          <div
            class="h-[calc(100%-88px)] flex items-center m-auto w-[100%] @2xl:max-w-500px @xl:max-w-500px @md:max-w-500px @lg:max-w-500px">
            <!-- <LoginForm
              v-if="isLogin"
              class="p-20px h-auto m-auto <xl:(rounded-3xl light:bg-white)"
              @to-register="toRegister" />
            <RegisterForm
              v-else
              class="p-20px h-auto m-auto <xl:(rounded-3xl light:bg-white)"
              @to-login="toLogin" /> -->
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-login {
  &__left {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-image: url('@/assets/svgs/login-bg.svg');
      background-position: center;
      background-repeat: no-repeat;
      content: '';
    }
  }
}
</style>
