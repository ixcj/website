<script setup lang="ts">
import type { Component } from 'vue'
import { sectionList } from '@/config/section'
import PageMainHome from './PageMainHome.vue'

const sectionMap: { [section: string]: Component } = {
  home: PageMainHome
}
</script>

<template>
  <div class="main">
    <section
      v-for="(section, index) in sectionList"
      :id="section"
      :class="{ first: index === 0 }"
    >
      <component :is="sectionMap[section]" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.main {
  .first {
    padding-top: var(--header-height);
    transition: padding-top var(--transition-duration);
    position: relative;
  }
}
</style>
