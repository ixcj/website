<script setup lang="ts">
import {} from '@/config'
</script>

<template>
  <div class="section-about">
    <div class="section-about-skill">
      <p class="section-about-skill-title">{{ $t('mySkills') }}</p>
      <div class="section-about-skill-box">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section-about {
  .section-about-skill {
    display: flex;
    justify-content: center;
    
    .section-about-skill-title {
      font-size: 24px;
    }
  }
}
</style>
