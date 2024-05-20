<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cursor = ref<HTMLElement | null>(null)
const cursorType = ref('auto')
const cursorState = ref('')

function onMousemove(event: MouseEvent) {
  if(!cursor.value) return

  const { clientX, clientY, target, } = event

  requestAnimationFrame(() => {
    cursor.value!.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`
    cursorType.value = getComputedStyle(target as Element)?.cursor || 'auto'
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
  transition: 0.125s ease-out;
  pointer-events: none;

  &.pointer {
    --cursor-size: 40px;
  }

  &.pressed {
    --cursor-size: 13px;
  }
}
</style>
