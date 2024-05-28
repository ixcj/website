<script setup lang="ts">
import { nextTick, watchEffect } from 'vue'
import { useLocalStorage } from '@vueuse/core'

const isDark = useLocalStorage('isDark', false)
watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
})

async function toggleDark() {
  isDark.value = !isDark.value
  await nextTick()
}

function switchTheme(event: MouseEvent) {
  if (!document.startViewTransition) {
    toggleDark()
    return
  }

  const { clientX, clientY } = event
  const radius = Math.hypot(
    Math.max(clientX, innerWidth - clientX),
    Math.max(clientY, innerHeight - clientY)
  )
  const clipPath = [
    `circle(0% at ${clientX}px ${clientY}px)`,
    `circle(${radius}px at ${clientX}px ${clientY}px)`,
  ]

  const transition = document.startViewTransition(async () => await toggleDark())
  transition.ready.then(() => {
    document.documentElement.classList.add('hide-scroll-bar')
    const animation = document.documentElement.animate(
      {
        clipPath: isDark.value ? clipPath.reverse() : clipPath
      },
      {
        duration: 400,
        easing: "ease-in",
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
    
    animation.onfinish =
      () => document.documentElement.classList.remove('hide-scroll-bar')
  })
}
</script>

<template>
  <div
    class="theme-switch hide-cursor"
    @click="switchTheme"
  >
    {{ isDark ? '🌙' : '☀️' }}
  </div>
</template>

<style lang="scss" scoped>
.theme-switch {
  cursor: pointer;
}
</style>
