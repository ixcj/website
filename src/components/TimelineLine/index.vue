<script setup lang="ts">
import type { TimelineTurntableItem } from '@/types/TimelineTurntable'
import { computed } from 'vue'
import { distinguishDateData, getDateString } from '@/components/TimelineTurntable/transform'

interface Props {
  data: TimelineTurntableItem[]
}

const props = defineProps<Props>()

interface TimelineItem {
  dateStart: string
  dateEnd: string
  title?: string
  children: {
    title?: string
    describe: string
  }[]
}

const timelineData = computed<TimelineItem[]>(() => {
  return props.data.map((item) => {
    const [start, end] = item.date
    return {
      dateStart: getDateString(distinguishDateData(start)),
      dateEnd: getDateString(distinguishDateData(end)),
      title: item.title,
      children: item.children.map(child => ({
        title: child.title,
        describe: child.describe,
      })),
    }
  })
})
</script>

<template>
  <div class="timeline-line">
    <div class="timeline-container">
      <div
        v-for="(item, index) in timelineData"
        :key="index"
        class="timeline-item"
      >
        <div class="timeline-marker">
          <div class="timeline-dot" />
          <div v-if="index !== timelineData.length - 1" class="timeline-connector" />
        </div>

        <div class="timeline-content">
          <div class="timeline-header">
            <span class="timeline-date">
              {{ item.dateStart }}
              <span class="timeline-date-separator">→</span>
              {{ item.dateEnd }}
            </span>
          </div>

          <h3 v-if="item.title" class="timeline-title">
            {{ item.title }}
          </h3>

          <div class="timeline-children">
            <div
              v-for="(child, childIndex) in item.children"
              :key="childIndex"
              class="timeline-child"
            >
              <h4 v-if="child.title" class="timeline-child-title">
                {{ child.title }}
              </h4>
              <div
                v-if="child.describe"
                class="timeline-child-describe"
                v-html="child.describe"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timeline-line {
  --timeline-line-color: var(--foreground-color);
  --timeline-dot-size: 12px;
  --timeline-line-width: 2px;
  --timeline-gap: 24px;

  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.timeline-container {
  position: relative;
}

.timeline-item {
  display: flex;
  gap: var(--timeline-gap);
  position: relative;

  &:not(:last-child) {
    padding-bottom: 32px;
  }
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: var(--timeline-dot-size);
  padding-top: 32px;
}

.timeline-dot {
  width: var(--timeline-dot-size);
  height: var(--timeline-dot-size);
  border-radius: 50%;
  background: var(--timeline-line-color);
  box-shadow: 0 0 0 4px var(--background-color), 0 0 0 6px color-mix(in srgb, var(--timeline-line-color) 30%, transparent);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  flex-shrink: 0;

  .timeline-item:hover & {
    transform: scale(1.2);
    box-shadow: 0 0 0 4px var(--background-color), 0 0 0 8px color-mix(in srgb, var(--timeline-line-color) 40%, transparent);
  }
}

.timeline-connector {
  width: var(--timeline-line-width);
  background: linear-gradient(
    to bottom,
    var(--timeline-line-color) 0%,
    color-mix(in srgb, var(--timeline-line-color) 30%, transparent) 100%
  );
  margin-top: 22px;
  border-radius: var(--timeline-line-width);
  position: absolute;
  height: calc(100% - 32px);
}

.timeline-content {
  flex: 1;
  min-width: 0;
}

.timeline-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.timeline-date {
  font-size: 14px;
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, monospace;
  color: color-mix(in srgb, var(--foreground-color) 70%, transparent);
  letter-spacing: 0.02em;

  .timeline-date-separator {
    margin: 0 4px;
    opacity: 0.5;
  }
}

.timeline-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 12px;
  color: var(--foreground-color);
  line-height: 1.4;
}

.timeline-children {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.timeline-child {
  padding: 16px;
  background: color-mix(in srgb, var(--foreground-color) 5%, transparent);
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--foreground-color) 10%, transparent);
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: color-mix(in srgb, var(--foreground-color) 8%, transparent);
    border-color: color-mix(in srgb, var(--foreground-color) 20%, transparent);
  }
}

.timeline-child-title {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 8px;
  color: var(--foreground-color);
}

.timeline-child-describe {
  font-size: 14px;
  line-height: 1.6;
  color: color-mix(in srgb, var(--foreground-color) 80%, transparent);

  :deep(div) {
    position: relative;
    padding-left: 16px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.6em;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--foreground-color) 40%, transparent);
    }

    &:not(:last-child) {
      margin-bottom: 6px;
    }
  }
}

// 响应式适配
@media (max-width: 480px) {
  .timeline-line {
    --timeline-gap: 16px;
    padding: 0 12px;
  }

  .timeline-title {
    font-size: 18px;
  }

  .timeline-child {
    padding: 12px;
  }

  .timeline-child-title {
    font-size: 15px;
  }

  .timeline-child-describe {
    font-size: 13px;
  }
}
</style>
