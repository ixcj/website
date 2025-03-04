<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import StereoCard from '@/components/StereoCard/index.vue'
import { touch } from '@/utils/screen'
import { useGyroscope } from '@/hooks/useGyroscope'

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

const { beta, gamma, ready, activate } = useGyroscope(false)
watchEffect(() => {
  activate.value = touch.value && ready.value
})

let initialBeta = 0
let initialGamma = 0

const stereoCardData = ref({ X: 0, Y: 0 })

function setXY() {
  if (!initialBeta) initialBeta = beta.value
  if (!initialGamma) initialGamma = gamma.value

  requestAnimationFrame(() => {
    const { xPercentage, yPercentage } = calculatePerspective(beta.value, gamma.value)

    stereoCardData.value.X = xPercentage
    stereoCardData.value.Y = yPercentage

    activate.value && setXY()
  })
}

function calculatePerspective(beta = 0, gamma = 0) {
  // 返回透视的 X 和 Y 百分比
  return {
    xPercentage: Math.sin((gamma - initialGamma) * Math.PI / 180) + 0.5,
    yPercentage: Math.sin((beta - initialBeta) * Math.PI / 180) + 0.5,
  };
}

onMounted(() => {
  watchEffect(() => {
    if (activate.value) {
      setXY()
    }
  })
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
        <StereoCard :data="item" :enableExternalData="touch && ready" :externaData="stereoCardData" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section-project {
  .project-box {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    padding: 0 20px;
    
    .project-item {
      width: calc((100% - 40px) / 3);
      aspect-ratio: 3 / 4;

      .sm & {
        width: calc((100% - 20px) / 2);
      }

      .xs &  {
        width: 100%;
        max-width: 300px;
      }
    }
  }
}
</style>