<script setup lang="ts">
import { skillList } from '@/config'
</script>

<template>
  <div class="section-skills text-type-box">
    <h2 class="section-title">
      {{ $t('SectionTitle.skills') }}
    </h2>

    <div class="section-skill-box">
      <div v-for="item in skillList" class="section-skill-item">
        <template v-if="item.icon">
          <img
            v-if="item.type === 'image'"
            :src="item.icon"
            :alt="item.name"
            class="section-skill-item-icon"
            loading="eager"
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
    margin-top: 20px;
    padding: 0 20px;

    .section-skill-item {
      font-size: 16px;
      display: flex;
      gap: 5px;
      justify-content: center;
      align-items: center;
      padding: 8px 12px;
      background-color: var(--foreground-color);
      color: var(--background-color);
      border-radius: 10px;

      .section-skill-item-icon {
        width: 20px;
        height: 20px;
        object-fit: cover;
      }
    }
  }
}
</style>
