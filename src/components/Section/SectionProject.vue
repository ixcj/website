<script setup lang="ts">
import { computed, onUnmounted, shallowRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import StereoCard from '@/components/StereoCard/index.vue'
import { useGyroscope } from '@/hooks/useGyroscope'
import { touch } from '@/utils/screen'

const { t } = useI18n()

const projects = computed(() => {
  try {
    const jsonData = t('projects')
    return JSON.parse(decodeURIComponent(jsonData))
  }
  catch (err) {
    console.error('An error occurred while getting the projects configuration: ', err)
    return []
  }
})

const { beta, gamma, ready, activate } = useGyroscope(false)
watch(
  [touch, ready],
  ([isTouch, isReady]) => {
    activate.value = isTouch && isReady
  },
  { immediate: true },
)

let initialBeta = 0
let initialGamma = 0
let frameRequest = 0

const stereoCardData = shallowRef({ X: 0, Y: 0 })

function cancelFrameRequest() {
  if (typeof cancelAnimationFrame === 'function')
    cancelAnimationFrame(frameRequest)
}

function setXY() {
  if (typeof requestAnimationFrame !== 'function')
    return

  if (!initialBeta)
    initialBeta = beta.value
  if (!initialGamma)
    initialGamma = gamma.value

  cancelFrameRequest()
  frameRequest = requestAnimationFrame(() => {
    const { xPercentage, yPercentage } = calculatePerspective(beta.value, gamma.value)

    stereoCardData.value = {
      X: xPercentage,
      Y: yPercentage,
    }

    if (activate.value)
      setXY()
  })
}

function calculatePerspective(beta = 0, gamma = 0) {
  // 返回透视的 X 和 Y 百分比
  return {
    xPercentage: Math.sin((gamma - initialGamma) * Math.PI / 180) + 0.5,
    yPercentage: Math.sin((beta - initialBeta) * Math.PI / 180) + 0.5,
  }
}

watch(
  activate,
  (isActive) => {
    if (!isActive) {
      cancelFrameRequest()
      return
    }

    initialBeta = 0
    initialGamma = 0
    if (activate.value)
      setXY()
  },
)

onUnmounted(() => {
  cancelFrameRequest()
})
</script>

<template>
  <div class="section-project">
    <h2 class="section-title">
      {{ $t('SectionTitle.project') }}
    </h2>

    <div class="project-box">
      <div
        v-for="item in projects"
        :key="item.name"
        class="project-item"
      >
        <StereoCard :data="item" :enable-external-data="touch && ready" :externa-data="stereoCardData" />
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
