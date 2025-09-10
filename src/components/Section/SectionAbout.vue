<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const introduce = computed(() => {
  try {
    const jsonData = t('introduce')
    return JSON.parse(decodeURIComponent(jsonData))
  }
  catch (err) {
    console.error('An error occurred while getting the introduce configuration: ', err)
    return ''
  }
})
</script>

<template>
  <div class="section-about text-type-box">
    <h2 class="section-title">
      {{ $t('SectionTitle.about') }}
    </h2>

    <div class="section-about-introduce" v-html="introduce" />
  </div>
</template>

<style lang="scss" scoped>
.section-about {
  .section-about-introduce {
    margin-top: 20px;
    padding: 0 20px;

    ::v-deep(p) {
      margin-bottom: 0.75em;
      line-height: 1.4;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
