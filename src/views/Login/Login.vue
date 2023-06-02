<script setup lang="ts">
import { LoginForm, PhoneLogin, QrCode, RegisterForm, ForgetPass } from './components'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { LocaleDropdown } from '@/components/LocaleDropdown'
import { useI18n } from '@/hooks/web/useI18n'
import { underlineToHump } from '@/utils'
import { useAppStoreHook } from '@/store/modules/app'
import { useUserStoreHook } from '@/store/modules/user'
const appStore = useAppStoreHook()
const userStore = useUserStoreHook()
const { t } = useI18n()
</script>

<template>
  <div class="v-login select-none relative xl:bg-v-dark">
    <div class="relative flex mx-auto">
      <div class="v-login__left h-screen flex-1 bg-gray-500 bg-opacity-20 relative p-5">
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
            <div class="text-3xl text-white" key="2">{{ t('login.welcome') }}</div>
            <div class="mt-5 font-normal text-white text-14px" key="3">
              {{ t('login.sysName') }}
            </div>
          </TransitionGroup>
        </div>
      </div>
      <div class="flex-1 p-7 sm:p-3 dark:bg-v-dark relative">
        <div class="flex justify-between items-center dark:text-white minLogoBox">
          <div class="flex items-center minLogo">
            <img src="@/assets/logo.png" alt="" class="w-12 h-12 mr-3" />
            <span class="text-xl font-bold">{{ underlineToHump(appStore.getTitle) }}</span>
          </div>

          <div class="flex justify-end items-center space-x-10px">
            <ThemeSwitch />
            <LocaleDropdown class="text-black dark:text-white" />
          </div>
        </div>
        <Transition appear enter-active-class="animate__animated animate__bounceInRight">
          <div class="h-[calc(100vh-72px)] flex items-center m-auto w-[100%] max-w-500px">
            <LoginForm
              v-if="userStore.currentPage === 0"
              class="p-5 h-auto m-auto xl:(rounded-3xl light:bg-white)" />
            <PhoneLogin
              v-if="userStore.currentPage === 1"
              class="p-5 h-auto m-auto xl:(rounded-3xl light:bg-white)" />
            <QrCode
              v-if="userStore.currentPage === 2"
              class="p-5 h-auto m-auto w-[380px] xl:(rounded-3xl light:bg-white)" />
            <RegisterForm
              v-if="userStore.currentPage === 3"
              class="p-5 h-auto m-auto xl:(rounded-3xl light:bg-white)" />
            <ForgetPass
              v-if="userStore.currentPage === 4"
              class="p-5 h-auto m-auto xl:(rounded-3xl light:bg-white)" />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-login {
  &__left {
    @media screen and (width <= 1279px) {
      display: none;
    }

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

@media screen and (width >= 1280px) {
  .minLogoBox {
    justify-content: flex-end;
  }

  .minLogo {
    display: none;
  }
}
</style>
