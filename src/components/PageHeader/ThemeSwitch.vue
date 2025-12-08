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
  <div class="theme-switch hide-page-cursor" @click="switchTheme">
    <component :is="isDark ? Moon : Sun" class="icon" />
  </div>
</template>

<style lang="scss" scoped>
.theme-switch {
  cursor: pointer;
  padding: 5px;

  .icon {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    position: relative;
    z-index: -1;
  }
}
</style>
