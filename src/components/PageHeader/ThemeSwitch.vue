<script setup lang="ts">
import { Moon, Sun } from '@vicons/fa'
import { useLocalStorage } from '@vueuse/core'
import { watchEffect } from 'vue'

const isDark = useLocalStorage('isDark', true)
watchEffect(() => {
  globalThis?.document?.documentElement.classList.toggle('dark', isDark.value)
})

function toggleDark() {
  isDark.value = !isDark.value
}

function switchTheme() {
  if (!document.startViewTransition) {
    toggleDark()
    return
  }

  document.startViewTransition(() => toggleDark())
}
</script>

<template>
  <button
    type="button"
    class="theme-switch plain-button hide-page-cursor"
    :aria-label="$t('a11y.switchTheme')"
    :aria-pressed="isDark"
    :title="$t('a11y.switchTheme')"
    @click="switchTheme"
  >
    <component :is="isDark ? Moon : Sun" class="icon" aria-hidden="true" />
  </button>
</template>

<style lang="scss" scoped>
.theme-switch {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;
  padding: 0;
  border-radius: 50%;
  transition: background-color var(--transition-duration);

  &:hover {
    background-color: var(--surface-hover);
  }

  .icon {
    width: 16px;
    height: 16px;
    // 让鼠标事件始终落在按钮上：图标切换时自定义光标仍能识别 .hide-page-cursor
    pointer-events: none;
  }
}
</style>
