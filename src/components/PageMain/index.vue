<script setup lang="ts">
import type { Component } from 'vue'
import type { Section } from '@/config'
import { computed } from 'vue'
import SectionAbout from '@/components/Section/SectionAbout.vue'
import SectionExperience from '@/components/Section/SectionExperience.vue'
import SectionHome from '@/components/Section/SectionHome.vue'
import SectionProject from '@/components/Section/SectionProject.vue'
import SectionSkills from '@/components/Section/SectionSkills.vue'
import { sectionList } from '@/config'
import { contentWidth } from '@/utils/screen'

const sectionMap: { [section in Section]: Component } = {
  home: SectionHome,
  about: SectionAbout,
  skills: SectionSkills,
  project: SectionProject,
  experience: SectionExperience,
}

const contentWidthString = computed(() => {
  return typeof contentWidth.value === 'number'
    ? `${contentWidth.value}px`
    : contentWidth.value
})
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
    margin-top: 0 !important;
    transition: padding-top var(--transition-duration);
    position: relative;
  }

  .section-item {
    margin: 20px auto calc(var(--header-height) + var(--mobile-extra-scroll-padding-top, 0px));
    max-width: v-bind(contentWidthString);
    transition: max-width var(--transition-duration);

    ::v-deep() {
      .section-title {
        font-size: 28px;
        text-align: center;
      }

      .text-type-box {
        max-width: 750px;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
}
</style>
