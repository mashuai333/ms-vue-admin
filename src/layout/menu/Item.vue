<template>
  <el-icon v-if="icon">
    <svg-icon :name="icon" />
  </el-icon>
  <span v-if="title">{{ title }}</span>
</template>
<script lang="ts" setup>
defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})
</script>
