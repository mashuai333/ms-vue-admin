<template>
  <div class="box-container">
    <el-icon class="icon">
      <svg-icon icon="403" />
    </el-icon>
    <div class="text-box">
      <p class="text-title"> 403 </p>
      <p class="text-content"> 抱歉，你无权访问该系统，请联系管理员！ </p>
      <el-button type="primary" @click="returnThirdLogin"> 返回统一登录 </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
const returnThirdLogin = () => {
  const userStore = useUserStore()
  window.location.href = userStore.thirdLoginUrl || '/'
}
</script>

<style lang="scss" scoped>
.box-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .icon {
    font-size: 500px;
  }

  .text-box {
    margin-left: 48px;

    .text-title {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    .text-content {
      color: #999;
      margin-bottom: 16px;
    }
  }
}
</style>
