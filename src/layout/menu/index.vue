<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-horizontal"
      mode="horizontal"
      :ellipsis="false">
      <menuItem
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { usePermissionStore } from '@/stores/modules/permission'

import menuItem from './menuItem.vue'
// 获取权限路由
const permission_routes = computed(() => usePermissionStore().routers)
const defaultActive = computed(() => {
  const route = useRoute()
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>
