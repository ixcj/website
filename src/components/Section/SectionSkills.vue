<script setup lang="ts">
import { skillList } from '@/config'
</script>

<template>
  <div class="section-skills text-type-box">
    <h2 class="section-title">
      {{ $t('SectionTitle.skills') }}
    </h2>

    <div class="section-skill-box">
      <div v-for="item in skillList" :key="item.name" class="section-skill-item">
        <template v-if="item.icon">
          <img
            v-if="item.type === 'image'"
            :src="item.icon"
            :alt="item.name"
            class="section-skill-item-icon"
            loading="lazy"
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
          >
          <component
            :is="item.icon"
            v-else
            :style="{ color: item.color }"
            class="section-skill-item-icon"
          />
        </template>

        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section-skills {
  .section-skill-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 24px;
    padding: 0 20px;

    .section-skill-item {
      font-size: 15px;
      display: flex;
      gap: 8px;
      justify-content: center;
      align-items: center;
      padding: 8px 14px;
      background-color: var(--surface);
      border: 1px solid var(--border);
      color: var(--foreground-color);
      border-radius: var(--radius-md);
      transition:
        background-color var(--transition-duration),
        border-color var(--transition-duration);

      &:hover {
        background-color: var(--surface-hover);
        border-color: var(--border-strong);
      }

      .section-skill-item-icon {
        width: 18px;
        height: 18px;
        object-fit: contain;
      }
    }
  }
}
</style>
