<script setup lang="ts">
import type { Component } from 'vue'
import { sectionList, type Section } from '@/config'
import { mobileThresholdValue } from '@/utils/screen'
import SectionHome from '@/components/Section/SectionHome.vue'
import SectionAbout from '@/components/Section/SectionAbout.vue'
import SectionSkills from '@/components/Section/SectionSkills.vue'
import SectionProject from '@/components/Section/SectionProject.vue'
import SectionExperience from '@/components/Section/SectionExperience.vue'

const sectionMap: { [section in Section]: Component } = {
  home: SectionHome,
  about: SectionAbout,
  skills: SectionSkills,
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
      class="section-item"
    >
      <component :is="sectionMap[section]" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.main {
  .first {
    padding-top: calc(var(--header-height) + 20px) !important;
    transition: padding-top var(--transition-duration);
    position: relative;
  }
  
  .section-item {
    padding: 20px 0;
    margin: 0 auto;
    max-width: calc(v-bind(mobileThresholdValue) * 1px);

    ::v-deep() {
      .section-title {
        font-size: 28px;
        text-align: center;
      }
    }
  }
}
</style>
