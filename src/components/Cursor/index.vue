<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const top = ref('0px')
const left = ref('0px')
const cursorType = ref('auto')
const pressed = ref(false)

function onMousemove(event: MouseEvent) {
  const { x, y, target } = event

  requestAnimationFrame(() => {
    top.value = `${y}px`
    left.value = `${x}px`
    cursorType.value = getComputedStyle(target as Element)?.cursor || 'auto'
  })
}

function onMousedown() {
  pressed.value = true
}

function onMouseup() {
  pressed.value = false
}

onMounted(() => {
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mousedown', onMousedown)
  document.addEventListener('mouseup', onMouseup)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMousemove)
  document.addEventListener('mousedown', onMousedown)
  document.addEventListener('mouseup', onMouseup)
})
</script>

<template>
  <div
    :class="[
      'cursor',
      cursorType,
      pressed ? 'pressed' : '',
    ]"
  ></div>
</template>

<style lang="scss" scoped>
.cursor {
  position: fixed;
  z-index: 9999;
  top: v-bind(top);
  left: v-bind(left);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  backdrop-filter: invert(100%);
  transform: translate(-50%, -50%);
  transition:
    top 0.2s ease-out,
    left 0.2s ease-out,
    width 0.15s ease,
    height 0.15s ease;
  pointer-events: none;

  &.pointer {
    width: 40px;
    height: 40px;
  }

  // mousedown style
  &.pressed {
    width: 10px;
    height: 10px;
  }
}
</style>
