<template>
  <div>
    <topHeader />
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import topHeader from './topHeader/index.vue'
</script>
