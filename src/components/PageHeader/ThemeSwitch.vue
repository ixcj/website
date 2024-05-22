<script setup lang="ts">
import { nextTick } from 'vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()

function switchTheme(event: MouseEvent) {
  if (!document.startViewTransition) {
    displayNewImage()
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

  const transition = document.startViewTransition(async () => await displayNewImage())

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: isDark.value ? clipPath.reverse() : clipPath
      },
      {
        duration: 400,
        easing: "ease-in",
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      }
    )
  })
}

async function displayNewImage() {
  isDark.value = !isDark.value
  await nextTick()
}
</script>

<template>
  <div
    class="theme-switch hide-cursor"
    @click="switchTheme"
  >
    {{ isDark ? '☀️' : '🌙' }}
  </div>
</template>

<style lang="scss" scoped>
.theme-switch {
  cursor: pointer;
}
</style>
