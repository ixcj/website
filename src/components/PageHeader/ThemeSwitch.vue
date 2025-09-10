<script setup lang="ts">
import { Moon, Sun } from '@vicons/fa'
import { useLocalStorage } from '@vueuse/core'
import { nextTick, watchEffect } from 'vue'
import { isStartViewTransition, mobile } from '@/utils/screen'

const isDark = useLocalStorage('isDark', true)
watchEffect(() => {
  globalThis?.document?.documentElement.classList.toggle('dark', isDark.value)
})

async function toggleDark() {
  isDark.value = !isDark.value
  await nextTick()
}

function switchTheme(event: MouseEvent) {
  if (!document.startViewTransition || mobile.value) {
    toggleDark()
    return
  }

  const { clientX, clientY } = event
  const radius = Math.hypot(
    Math.max(clientX, innerWidth - clientX),
    Math.max(clientY, innerHeight - clientY),
  )
  const clipPath = [
    `circle(0% at ${clientX}px ${clientY}px)`,
    `circle(${radius}px at ${clientX}px ${clientY}px)`,
  ]

  const transition = document.startViewTransition(async () => await toggleDark())
  transition.ready.then(() => {
    isStartViewTransition.value = true
    document.documentElement.classList.add('hide-scroll-bar')
    document.documentElement.animate({
      clipPath: isDark.value ? clipPath.reverse() : clipPath,
    }, {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: isDark.value
        ? '::view-transition-old(root)'
        : '::view-transition-new(root)',
    }).onfinish = () => {
      isStartViewTransition.value = false
      document.documentElement.classList.remove('hide-scroll-bar')
    }
  })
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
