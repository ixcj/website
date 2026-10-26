<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
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

// Non-reactive and mutated in place: cards read the latest value in their own rAF loop.
// Replacing it with a new reactive object every frame re-rendered this section and every card per frame.
const stereoCardData = { X: 0, Y: 0 }

function cancelFrameRequest() {
  if (frameRequest && typeof cancelAnimationFrame === 'function')
    cancelAnimationFrame(frameRequest)
  frameRequest = 0
}

function updateXY() {
  frameRequest = 0
  if (!activate.value)
    return

  if (!initialBeta)
    initialBeta = beta.value
  if (!initialGamma)
    initialGamma = gamma.value

  const { xPercentage, yPercentage } = calculatePerspective(beta.value, gamma.value)
  stereoCardData.X = xPercentage
  stereoCardData.Y = yPercentage
}

// Coalesce updates per frame and only when gyroscope data changes; no idle requestAnimationFrame loop
function requestUpdateXY() {
  if (frameRequest || typeof requestAnimationFrame !== 'function')
    return

  frameRequest = requestAnimationFrame(updateXY)
}

function calculatePerspective(beta = 0, gamma = 0) {
  // 返回透视的 X 和 Y 百分比
  return {
    xPercentage: Math.sin((gamma - initialGamma) * Math.PI / 180) + 0.5,
    yPercentage: Math.sin((beta - initialBeta) * Math.PI / 180) + 0.5,
  }
}

watch([beta, gamma], () => {
  if (activate.value)
    requestUpdateXY()
})

watch(
  activate,
  (isActive) => {
    if (!isActive) {
      cancelFrameRequest()
      return
    }

    initialBeta = 0
    initialGamma = 0
    requestUpdateXY()
  },
)

// —— 入场：卡片进入视口时依次浮现；SSR 与减少动效时默认可见 ——
const itemRefs = ref<HTMLElement[]>([])
const motionReady = ref(false)
const visibleSet = ref(new Set<number>())
let observer: IntersectionObserver | null = null

onMounted(() => {
  const reduceMotion = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion || typeof IntersectionObserver === 'undefined')
    return

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting)
        return
      const index = itemRefs.value.indexOf(entry.target as HTMLElement)
      if (index > -1) {
        visibleSet.value = new Set(visibleSet.value).add(index)
        observer?.unobserve(entry.target)
      }
    })
  }, { rootMargin: '0px 0px -10% 0px' })

  itemRefs.value.forEach((el, index) => {
    // 挂载时已在视口内的卡片直接显示，避免闪烁
    if (el.getBoundingClientRect().top < globalThis.innerHeight)
      visibleSet.value.add(index)
    else
      observer?.observe(el)
  })
  motionReady.value = true
})

onUnmounted(() => {
  cancelFrameRequest()
  observer?.disconnect()
})
</script>

<template>
  <div class="section-project">
    <h2 class="section-title">
      {{ $t('SectionTitle.project') }}
    </h2>

    <ul class="project-box" :class="{ 'motion-ready': motionReady }">
      <li
        v-for="(item, index) in projects"
        :key="item.name"
        ref="itemRefs"
        class="project-item"
        :class="{ 'is-visible': visibleSet.has(index) }"
        :style="{ '--i': index }"
      >
        <StereoCard :data="item" :enable-external-data="touch && ready" :externa-data="stereoCardData" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.section-project {
  .project-box {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
    gap: 20px;
    max-width: 860px;
    margin: 28px auto 0;
    padding: 0 20px;
    box-sizing: border-box;
    list-style: none;

    .xs & {
      gap: 16px;
      margin-top: 20px;
      padding: 0 16px;
    }
  }

  .project-item {
    min-width: 0;
  }

  .motion-ready .project-item {
    opacity: 0;
    transform: translateY(16px);
    transition:
      opacity 0.5s ease,
      transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: calc(var(--i, 0) * 80ms);

    &.is-visible {
      opacity: 1;
      transform: none;
    }
  }
}
</style>
