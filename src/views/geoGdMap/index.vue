<template>
  <div>
    <CustomGDMap :setSymbol="typeAndData" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomGDMap from './map.vue'
const typeAndData = ref(null)
</script>
