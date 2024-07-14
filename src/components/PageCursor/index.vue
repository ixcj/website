<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  hideCursorClass?: string
}>(), {
  hideCursorClass: 'hide-page-cursor'
})

const cursor = ref<HTMLElement | null>(null)
const cursorType = ref('auto')
const cursorState = ref('')

let myReq: number = 0

function onMousemove(event: MouseEvent) {
  if(!cursor.value) return

  const { clientX, clientY } = event
  const target = event.target as HTMLElement

  cancelAnimationFrame(myReq)

  myReq = requestAnimationFrame(() => {
    const style = cursor.value!.style
    style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`
    cursorType.value = getComputedStyle(target)?.cursor || 'auto'

    const hideCursor = target.classList.contains(props.hideCursorClass)
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
  globalThis.document.removeEventListener('mousedown', onMousedown)
  globalThis.document.removeEventListener('mouseup', onMouseup)
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
  top: calc(-1 * var(--cursor-size) / 2);
  left: calc(-1 * var(--cursor-size) / 2);
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
