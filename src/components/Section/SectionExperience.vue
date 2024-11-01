<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TimelineTurntable from '@/components/TimelineTurntable/index.vue'

const { t } = useI18n()

const experiences = computed(() => {
  try {
    const jsonData = t('experiences')
    return JSON.parse(decodeURIComponent(jsonData))
  } catch(err) {
    console.error('An error occurred while getting the experience configuration: ', err)
    return []
  }
})
</script>

<template>
  <div class="section-experience">
    <h2 class="section-title">{{ $t('SectionTitle.experience') }}</h2>

    <div class="section-experience-box hide-page-cursor">
      <TimelineTurntable :data="experiences" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section-experience {
  .section-experience-box {
    margin-top: 20px;
  }
}
</style>