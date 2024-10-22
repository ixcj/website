<script setup lang="ts">
import TimelineTurntable from '@/components/TimelineTurntable/index.vue'
</script>

<template>
  <div class="section-experience">
    <h2 class="section-title">{{ $t('SectionTitle.experience') }}</h2>

    <div class="section-experience-box">
      <TimelineTurntable />
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