<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cursor = ref<HTMLElement | null>(null)
const cursorType = ref('auto')
const cursorState = ref('')

function onMousemove(event: MouseEvent) {
  if(!cursor.value) return

  const { clientX, clientY } = event
  const target = event.target as HTMLElement

  requestAnimationFrame(() => {
    const style = cursor.value!.style
    style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`
    cursorType.value = getComputedStyle(target)?.cursor || 'auto'

    const hideCursor = target.classList.contains('hide-cursor') || target.parentElement?.classList.contains('hide-cursor')
    style.opacity = hideCursor ? '0' : '1'
    style.transition = hideCursor ? '0.2s ease-out' : '0.125s ease-out'
  })
}

function onMousedown() {
  cursorState.value = 'pressed'
}

function onMouseup() {
  cursorState.value = ''
}

onMounted(() => {
  globalThis.document.addEventListener('mousemove', onMousemove)
  globalThis.document.addEventListener('mousedown', onMousedown)
  globalThis.document.addEventListener('mouseup', onMouseup)
})

onUnmounted(() => {
  globalThis.document.removeEventListener('mousemove', onMousemove)
  globalThis.document.addEventListener('mousedown', onMousedown)
  globalThis.document.addEventListener('mouseup', onMouseup)
})
</script>

<template>
  <div
    ref="cursor"
    class="page-cursor"
    :class="[cursorType, cursorState]"
  ></div>
</template>

<style lang="scss" scoped>
.page-cursor {
  --cursor-size: 20px;
  position: fixed;
  z-index: 9999;
  top: calc(0px - var(--cursor-size) / 2);
  left: calc(0px - var(--cursor-size) / 2);
  width: var(--cursor-size);
  height: var(--cursor-size);
  border-radius: 50%;
  backdrop-filter: invert(100%);
  pointer-events: none;
  opacity: 0;

  &.pointer {
    --cursor-size: 40px;

    &.pressed {
      --cursor-size: 20px;
    }
  }

  &.pressed {
    --cursor-size: 10px;
  }
}
</style>
