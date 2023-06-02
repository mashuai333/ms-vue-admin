<template>
  <el-header>
    <div class="left-list">
      <div class="ap-title">
        <img src="@/assets/logo.png" alt="logo" />
        <!-- <span>大准铁路管理系统</span> -->
      </div>
      <Menu />
    </div>
    <div class="right-menu">
      <span class="user-name" v-if="isThirdLogin"> Hi,{{ userName }} </span>
      <el-dropdown class="user-select" trigger="hover" v-else>
        <span class="el-dropdown-link">
          Hi,{{ userName }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="modifyPassword">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-icon title="退出登录" @click="quitUser">
        <svg-icon icon="exit" color="#ffffff" />
      </el-icon>
    </div>
  </el-header>
  <modifyPasswordVue v-if="modalShow" v-model:visible="modalShow" @submitForm="toLogin" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
// import { ElMessage } from "element-plus";
import modifyPasswordVue from './modifyPasswordDiag.vue'

import { useUserStore } from '@/store/modules/user'

import Menu from '@/layout/menu/index.vue'

const router = useRouter()
const userStore = useUserStore()
const userName = computed(() => userStore.userName)
const isThirdLogin = computed(() => userStore.isThirdLogin)
const modalShow = ref(false)
// 修改密码
const modifyPassword = () => {
  modalShow.value = true
}

const toLogin = () => {
  quitUser()
}

// 退出登录
const quitUser = () => {
  userStore
    .logout()
    .then(() => {
      router.push('/thirdLogin')
    })
    .catch(err => {
      ElMessage.error(err)
    })
}
</script>

<style lang="scss" scoped>
.el-header {
  height: 50px;
  // color: #ffffff;
  background: $headBg;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // border-bottom: 1px solid #eee;
  overflow: hidden;

  .left-list {
    display: flex;
    align-items: center;

    .ap-title {
      font-size: 18px;
      display: flex;
      align-items: center;

      img {
        margin-right: 10px;
        height: 30px;
        width: 47px;
      }
    }
  }

  .right-menu {
    font-size: 16px;
    line-height: 50px;
    display: flex;
    align-items: center;

    .user-name {
      margin: 0 12px;
      color: #fff;
      font-size: 14px;
    }

    .user-select {
      margin: 0 12px;

      .el-dropdown-link {
        cursor: pointer;
        color: #fff;
      }
    }

    i {
      cursor: pointer;
    }
  }
}
</style>
