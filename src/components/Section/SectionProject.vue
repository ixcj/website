<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import StereoCard from '@/components/StereoCard/index.vue'

const { t } = useI18n()

const projects = computed(() => {
  try {
    const jsonData = t('projects')
    return JSON.parse(decodeURIComponent(jsonData))
  } catch(err) {
    console.error('An error occurred while getting the projects configuration: ', err)
    return []
  }
})
</script>

<template>
  <div class="section-project">
    <h2 class="section-title">{{ $t('SectionTitle.project') }}</h2>

    <div class="project-box">
      <div
        v-for="item in projects"
        class="project-item"
      >
        <StereoCard :data="item" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section-project {
  .project-box {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    padding: 0 20px;
    
    .project-item {
      width: calc((100% - 20px) / 2);
      aspect-ratio: 3 / 4;
    }
  }
}
</style>