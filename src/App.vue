<script setup lang="ts">
import { useDisplay } from '@/hooks'
import { breakpointsConfig, mobileBreakpoint } from '@/config/breakpoints'

const { name: breakpointsName } = useDisplay(breakpointsConfig, mobileBreakpoint)
</script>

<template>
  <div :class="[breakpointsName]">
    {{ $t('subTitle') }}
  </div>
</template>

<style scoped>
</style>
