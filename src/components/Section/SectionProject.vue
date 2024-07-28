<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const projects = computed(() => {
  try {
    const jsonData = t('projects')
    return JSON.parse(decodeURIComponent(jsonData))
  } catch(err) {
    console.error(err)
    return []
  }
})
</script>

<template>
  <div class="section-project">
    <p class="section-title">{{ $t('SectionTitle.project') }}</p>

    <div class="project-box">
      <div
        v-for="item in projects"
        class="project-item"
      >
        <p class="project-item-name">{{ item.name }}</p>
        <img class="project-item-cover" :src="item.cover" alt="">
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
      height: 350px;
      position: relative;
      background-color: var(--text-color);
      padding: 10px;
      box-sizing: border-box;
      border-radius: 5px;

      .project-item-name {
        color: var(--bg-color);
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        position: absolute;
        left: 50%;
        transform: translate3d(-50%, 0, 30px);
        perspective: 200px;
      }

      .project-item-cover {
        width: 100%;
        height: 100%;
        object-fit: contain;
        opacity: 0.85;
      }
    }
  }
}
</style>