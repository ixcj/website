<script setup lang="ts">
import type { dateData, TimelineTurntableItem } from '@/types/TimelineTurntable'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  distinguishDateData,
  getDateString,
  getMonthSpan,
  sortExperiences,
} from '@/utils/dateTransform'

interface Props {
  data: TimelineTurntableItem[]
}

const props = defineProps<Props>()

interface TimelineItem {
  key: string
  start: { label: string, datetime: string }
  end: { label: string, datetime: string, isNow: boolean }
  duration: string
  isCurrent: boolean
  title?: string | undefined
  children: {
    title?: string | undefined
    describe: string
  }[]
}

const { t } = useI18n()

function formatDate(date: dateData) {
  const datetime = getDateString(distinguishDateData(date))
  return { datetime, label: datetime.replace('-', '.') }
}

/** 含首尾两个月，与简历常见写法一致：2020.07 – 2021.12 记为 1 年 6 个月 */
function formatDuration(start: dateData, end: dateData) {
  const months = Math.max(getMonthSpan(start, end) + 1, 1)
  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts: string[] = []
  if (years)
    parts.push(t('experienceMeta.year', years))
  if (rest)
    parts.push(t('experienceMeta.month', rest))
  return parts.join(' ')
}

const timelineData = computed<TimelineItem[]>(() => {
  return sortExperiences([...props.data]).map((item, index) => {
    const [start, end] = item.date
    const isNow = end === 'now'
    const endDate = formatDate(end)

    return {
      key: `${getDateString(distinguishDateData(start))}-${item.title ?? index}`,
      start: formatDate(start),
      end: { ...endDate, label: isNow ? t('now') : endDate.label, isNow },
      duration: formatDuration(start, end),
      isCurrent: isNow,
      title: item.title,
      children: item.children.map(child => ({
        title: child.title,
        describe: child.describe,
      })),
    }
  })
})

// —— 滚动点亮轴线 + 入场 ——
const rootRef = ref<HTMLElement | null>(null)
const itemRefs = ref<HTMLElement[]>([])
const axisProgress = ref(0)
const reachedCount = ref(0)
const motionReady = ref(false)
const visibleSet = ref(new Set<number>())

let frame = 0
let observer: IntersectionObserver | null = null

function updateProgress() {
  frame = 0
  const root = rootRef.value
  if (!root)
    return

  const rect = root.getBoundingClientRect()
  // 经历在页面末尾，滚到底时锚点下移到视口底部，保证最后一段也能被点亮
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  const anchor = atBottom ? window.innerHeight : window.innerHeight * 0.6
  const progress = (anchor - rect.top) / Math.max(rect.height, 1)
  axisProgress.value = Math.min(Math.max(progress, 0), 1)

  reachedCount.value = itemRefs.value.filter((el) => {
    const dot = el.querySelector('.timeline-dot')
    return dot ? dot.getBoundingClientRect().top <= anchor : false
  }).length
}

function requestUpdate() {
  if (!frame)
    frame = requestAnimationFrame(updateProgress)
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', requestUpdate, { passive: true })
  window.addEventListener('resize', requestUpdate, { passive: true })

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
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
  }, { rootMargin: '0px 0px -12% 0px' })

  itemRefs.value.forEach((el, index) => {
    // 首次挂载时已在视口内的条目直接显示，避免闪烁
    if (el.getBoundingClientRect().top < window.innerHeight)
      visibleSet.value.add(index)
    else
      observer?.observe(el)
  })
  motionReady.value = true
})

onUnmounted(() => {
  window.removeEventListener('scroll', requestUpdate)
  window.removeEventListener('resize', requestUpdate)
  if (frame)
    cancelAnimationFrame(frame)
  observer?.disconnect()
})
</script>

<template>
  <div
    ref="rootRef"
    class="timeline-line"
    :class="{ 'motion-ready': motionReady }"
    :style="{ '--axis-progress': axisProgress }"
  >
    <div class="timeline-axis" aria-hidden="true">
      <div class="timeline-axis-fill" />
    </div>

    <ol class="timeline-list">
      <li
        v-for="(item, index) in timelineData"
        :key="item.key"
        ref="itemRefs"
        class="timeline-item"
        :class="{
          'is-current': item.isCurrent,
          'is-reached': index < reachedCount,
          'is-visible': visibleSet.has(index),
        }"
      >
        <div class="timeline-meta">
          <p class="timeline-period">
            <time class="timeline-date" :datetime="item.start.datetime">{{ item.start.label }}</time>
            <span class="timeline-period-separator" aria-hidden="true">–</span>
            <time
              class="timeline-date"
              :class="{ 'is-now': item.end.isNow }"
              :datetime="item.end.datetime"
            >{{ item.end.label }}</time>
          </p>
          <p class="timeline-duration">
            {{ item.duration }}
          </p>
        </div>

        <div class="timeline-marker" aria-hidden="true">
          <span class="timeline-dot" />
        </div>

        <article class="timeline-card">
          <header class="timeline-card-header">
            <h3 v-if="item.title" class="timeline-title">
              {{ item.title }}
            </h3>
            <span v-if="item.isCurrent" class="timeline-status">
              {{ $t('experienceMeta.current') }}
            </span>
          </header>

          <div
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
            class="timeline-child"
          >
            <h4 v-if="child.title" class="timeline-role">
              {{ child.title }}
            </h4>
            <div
              v-if="child.describe"
              class="timeline-describe"
              v-html="child.describe"
            />
          </div>
        </article>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
.timeline-line {
  --meta-width: 148px;
  --axis-width: 40px;
  --dot-size: 11px;
  --dot-top: 26px;
  --axis-x: calc(var(--meta-width) + var(--axis-width) / 2);
  --accent-a: #C850C0;
  // 在职强调色：亮色背景上 #80D0C7 对比度不足，改用更深的青色；暗色主题沿用品牌青
  --accent-b: #14958A;

  :root.dark & {
    --accent-b: #80D0C7;
  }

  position: relative;
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;

  .xs & {
    --meta-width: 0px;
    --axis-width: 28px;
    --dot-top: 11px;

    padding: 0 16px 0 12px;
  }
}

// —— 轴线：底轨 + 随滚动点亮的进度 ——
.timeline-axis {
  position: absolute;
  top: var(--dot-top);
  bottom: 40px;
  left: calc(20px + var(--axis-x) - 1px);
  width: 2px;
  border-radius: 2px;
  background: var(--border);
  overflow: hidden;

  .xs & {
    left: calc(12px + var(--axis-x) - 1px);
  }
}

.timeline-axis-fill {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(to bottom, var(--accent-b), var(--accent-a) 60%, var(--border-strong));
  transform: scaleY(var(--axis-progress, 1));
  transform-origin: top;
  transition: transform 0.12s linear;
}

.timeline-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 28px;

  .xs & {
    gap: 32px;
  }
}

.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: var(--meta-width) var(--axis-width) minmax(0, 1fr);
  align-items: start;

  .xs & {
    grid-template-columns: var(--axis-width) minmax(0, 1fr);
    grid-template-areas:
      'marker meta'
      'marker card';
    row-gap: 10px;
  }
}

// —— 左侧时间栏 ——
.timeline-meta {
  padding-top: calc(var(--dot-top) - 7px);
  padding-right: 4px;
  text-align: right;
  transition: opacity var(--transition-duration);

  .xs & {
    grid-area: meta;
    padding: 0;
    text-align: left;
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 4px 12px;
  }
}

.timeline-period {
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-muted);
  white-space: nowrap;
}

.timeline-date {
  font-family: var(--font-mono);
  letter-spacing: 0.02em;

  &.is-now {
    font-family: inherit;
    letter-spacing: 0.04em;
    color: var(--foreground-color);
    font-weight: 600;
  }
}

.timeline-period-separator {
  margin: 0 6px;
  color: var(--text-subtle);
}

.timeline-duration {
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-subtle);

  .xs & {
    margin-top: 0;
  }
}

// —— 轴上的节点 ——
.timeline-marker {
  position: relative;
  height: 100%;

  .xs & {
    grid-area: marker;
  }
}

.timeline-dot {
  position: absolute;
  top: calc(var(--dot-top) - var(--dot-size) / 2);
  left: 50%;
  width: var(--dot-size);
  height: var(--dot-size);
  box-sizing: border-box;
  border-radius: 50%;
  border: 2px solid var(--border-strong);
  background: var(--background-color);
  box-shadow: 0 0 0 4px var(--background-color);
  transform: translateX(-50%);
  transition:
    border-color var(--transition-duration),
    background-color var(--transition-duration),
    transform var(--transition-duration);

  .is-reached & {
    border-color: var(--foreground-color);
    background: var(--foreground-color);
  }

  .timeline-item:hover & {
    transform: translateX(-50%) scale(1.25);
  }

  .is-current & {
    border-color: transparent;
    background: var(--accent-b);
    box-shadow:
      0 0 0 4px var(--background-color),
      0 0 10px 1px color-mix(in srgb, var(--accent-b) 40%, transparent);
  }

  .is-current &::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 1px solid color-mix(in srgb, var(--accent-b) 70%, transparent);
    animation: timeline-pulse 2.4s ease-out infinite;
  }
}

@keyframes timeline-pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.9;
  }

  100% {
    transform: scale(2);
    opacity: 0;
  }
}

// —— 右侧经历卡 ——
.timeline-card {
  min-width: 0;
  padding: 18px 22px 20px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--surface);
  transition:
    background-color var(--transition-duration),
    border-color var(--transition-duration);

  .timeline-item:hover & {
    background: var(--surface-hover);
    border-color: var(--border-strong);
  }

  .is-current & {
    border-color: color-mix(in srgb, var(--accent-b) 28%, var(--border));
  }

  .xs & {
    grid-area: card;
    padding: 14px 16px 16px;
  }
}

.timeline-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px 12px;
}

.timeline-title {
  margin: 0;
  font-size: 19px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--foreground-color);

  .xs & {
    font-size: 17px;
  }
}

.timeline-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 10px;
  font-size: 12px;
  line-height: 20px;
  border-radius: 999px;
  color: var(--foreground-color);
  border: 1px solid color-mix(in srgb, var(--accent-b) 40%, transparent);
  background: color-mix(in srgb, var(--accent-b) 10%, transparent);

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent-b);
  }
}

.timeline-child {
  margin-top: 12px;

  & + & {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px dashed var(--border);
  }
}

.timeline-role {
  display: inline-block;
  margin: 0 0 10px;
  padding: 1px 8px;
  font-size: 13px;
  font-weight: 500;
  line-height: 22px;
  color: var(--text-muted);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface);
}

.timeline-describe {
  font-size: 14px;
  line-height: 1.75;
  color: var(--text-muted);

  :deep(div) {
    position: relative;
    padding-left: 16px;

    &::before {
      content: '';
      position: absolute;
      left: 2px;
      top: calc(0.875em - 2px);
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--border-strong);
    }

    &:not(:last-child) {
      margin-bottom: 4px;
    }
  }
}

// —— 入场：仅在脚本就绪且允许动效时生效，SSR 内容默认可见 ——
.motion-ready .timeline-item {
  .timeline-card,
  .timeline-meta {
    opacity: 0;
    transform: translateY(14px);
    transition:
      opacity 0.5s ease,
      transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
      background-color var(--transition-duration),
      border-color var(--transition-duration);
  }

  .timeline-meta {
    transition-delay: 0.06s;
  }

  &.is-visible {
    .timeline-card,
    .timeline-meta {
      opacity: 1;
      transform: none;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .timeline-axis-fill {
    transition: none;
  }

  .timeline-dot {
    transition: none;

    .timeline-item:hover & {
      transform: translateX(-50%);
    }

    .is-current &::after {
      animation: none;
      opacity: 0;
    }
  }
}
</style>
