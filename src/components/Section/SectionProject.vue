<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const projects = computed(() => {
  const jsonData = t('projects')

  try {
    return JSON.parse(jsonData)
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
        <div class="front">
          <p class="project-item-name">{{ item.name }}</p>
          <img class="project-item-cover" :src="item.cover" alt="">
        </div>
        <div class="back">
          <p class="project-item-name">{{ item.name }}</p>
        </div>
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

      &:hover {
        .front {
          transform: rotateY(180deg);
        }

        .back {
          transform: rotateY(0deg);
        }
      }

      .front,
      .back {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background-color: var(--text-color);
        backface-visibility: hidden;
        transition: transform calc(var(--transition-duration) * 2);
        padding: 15px;
        overflow: hidden;

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

      .back {
        transform: rotateY(180deg);
      }
    }
  }
}
</style>