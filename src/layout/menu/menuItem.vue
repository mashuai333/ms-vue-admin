<template>
  <div v-if="!item?.meta?.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!(onlyOneChild.children && onlyOneChild.children.length) || onlyOneChild.noShowingChildren)
      ">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <Item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template #title v-if="item.meta">
        <Item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <menuItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu" />
    </el-sub-menu>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'
import type { RouteMeta } from 'vue-router'
import Item from './Item.vue'
import appLink from './Link.vue'
import { ref } from 'vue'
import path from 'path-browserify'
import { isExternal } from '@/utils/validate'

const props = defineProps({
  item: {
    type: Object as PropType<AppCustomRouteRecordRaw>,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})
const onlyOneChild = ref(null)

const hasOneShowingChild = (
  children: AppCustomRouteRecordRaw[] = [],
  parent: AppCustomRouteRecordRaw
) => {
  const showingChildren = children.filter(v => {
    const meta = (v.meta ?? {}) as RouteMeta
    if (meta.hidden) {
      return false
    } else {
      // 缓存展示只有一个chidren的sideItem
      onlyOneChild.value = v
      return true
    }
  })
  // 当只有一个子路由器时，默认情况下会显示该子路由器
  if (showingChildren.length === 1) {
    return true
  }

  // 如果没有要显示的子路由，则显示父路由
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}
</script>
