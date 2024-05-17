<script setup lang="ts">
import Cursor from '@/components/Cursor/index.vue'

import { breakpointsName, mobile } from '@/utils'
</script>

<template>
  <div
    :class="[
      breakpointsName,
      mobile ? 'mobile' : ''
    ]"
  >
    <Cursor v-if="!mobile" />
    <div style="cursor: pointer; background-color: burlywood; padding: 50px;">{{ $t('title') }}</div>
  </div>
</template>

<style scoped>
</style>
