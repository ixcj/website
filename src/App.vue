<script setup lang="ts">
import { breakpointsName, mobile } from '@/utils'
import PageCursor from '@/components/PageCursor/index.vue'
import PageHeader from '@/components/PageHeader/index.vue'
</script>

<template>
  <div class="container" :class="[breakpointsName, mobile ? 'mobile' : '']">
    <page-cursor v-if="!mobile" />
    <page-header />
    <div style="cursor: pointer; background-color: burlywood; padding: 50px;">{{ $t('subTitle') }}</div>
  </div>
</template>

<style lang="scss">
.container {
  padding-top: var(--header-height);
  background-color: #ff0;
}
</style>
