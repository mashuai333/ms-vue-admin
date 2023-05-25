<template>
  <div class="error-page">
    <el-row>
      <el-col :span="24">
        <div class="title">很抱歉，您访问的页面不存在</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><img src="@/assets/images/NoFind.png" class="err-img" /></el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="reminder">您可以通过以下方式继续操作:</div>
      </el-col>
    </el-row>
    <div class="hanlde-btn">
      <div class="goHome" @click="HomeFu">
        <el-button type="primary">访问首页</el-button>
      </div>

      <div class="go-back" @click="BackFu">
        <el-button type="primary">返回上一页</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const HomeFu = () => {
  router.push({
    path: '/'
  })
}
const BackFu = () => {
  router.back()
}
</script>
<style lang="scss" scoped>
.error-page {
  margin: 0 auto;
  padding-top: 30vh;
  color: #a6aab9;
  letter-spacing: 1px;
  text-align: center;

  .title {
    height: 100px;
    font-size: 24px;
    line-height: 50px;
  }

  .err-img {
    padding-bottom: 50px;
  }

  .reminder {
    padding-bottom: 40px;
    font-size: 18px;
  }

  .hanlde-btn {
    display: flex;
    justify-content: center;

    .go-back {
      margin-left: 30px;
    }

    .el-button {
      width: 110px;
      height: 34px;
      padding: 0;
      line-height: 34px;
    }
  }
}
</style>
