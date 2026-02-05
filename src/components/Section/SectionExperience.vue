<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TimelineLine from '@/components/TimelineLine/index.vue'
import TimelineTurntable from '@/components/TimelineTurntable/index.vue'
import { experienceType } from '@/config'

const { t } = useI18n()

const experiences = computed(() => {
  try {
    const jsonData = t('experiences')
    return JSON.parse(decodeURIComponent(jsonData))
  }
  catch (err) {
    console.error('An error occurred while getting the experience configuration: ', err)
    return []
  }
})

const isLineType = computed(() => experienceType === 'line')
</script>

<template>
  <div class="section-experience">
    <h2 class="section-title">
      {{ $t('SectionTitle.experience') }}
    </h2>

    <div class="section-experience-box" :class="{ 'hide-page-cursor': !isLineType }">
      <TimelineLine v-if="isLineType" :data="experiences" />
      <TimelineTurntable v-else :data="experiences" />
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
