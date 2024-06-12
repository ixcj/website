<script setup lang="ts">
import type { Component } from 'vue'
import { sectionList, type Section } from '@/config'
import SectionHome from '@/components/Section/SectionHome.vue'
import SectionAbout from '@/components/Section/SectionAbout.vue'
import SectionProject from '@/components/Section/SectionProject.vue'
import SectionExperience from '@/components/Section/SectionExperience.vue'

const sectionMap: { [section in Section]: Component } = {
  home: SectionHome,
  about: SectionAbout,
  project: SectionProject,
  experience: SectionExperience,
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
