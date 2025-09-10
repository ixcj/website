<script setup lang="ts">
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

const props = withDefaults(defineProps<{
  hideCursorSelector?: string | string[]
}>(), {
  hideCursorSelector: '.hide-page-cursor',
})

const cursor = ref<HTMLElement | null>(null)
const cursorType = ref('auto')
const cursorState = ref('')

const cursorStyle = computed<CSSStyleDeclaration>(() => {
  return cursor.value?.style || {} as CSSStyleDeclaration
})

let myReq: number = 0

function onMousemove(event: MouseEvent) {
  if (!cursor.value)
    return

  cancelAnimationFrame(myReq)

  const { clientX, clientY } = event
  const target = event.target as HTMLElement

  myReq = requestAnimationFrame(() => {
    cursorStyle.value.transform = `translate3d(${clientX}px, ${clientY}px, 0)`
    cursorType.value = getComputedStyle(target)?.cursor || 'auto'

    const hideCursorSelectorList = Array.isArray(props.hideCursorSelector)
      ? props.hideCursorSelector
      : [props.hideCursorSelector]
    const hideCursor = hideCursorSelectorList.some(item => target.closest(item) !== null)
    cursorStyle.value.opacity = hideCursor ? '0' : '1'
    cursorStyle.value.transition = hideCursor ? '0.2s ease-out' : '0.125s ease-out'
  })
}

function onMousedown() {
  cursorState.value = 'pressed'
}

function onMouseup() {
  cursorState.value = ''
}

function onMouseenter() {
  cancelAnimationFrame(myReq)

  requestAnimationFrame(() => {
    cursorStyle.value.transition = 'none'
    cursorStyle.value.opacity = '1'
  })
}

function onMouseleave() {
  cancelAnimationFrame(myReq)

  requestAnimationFrame(() => {
    cursorStyle.value.opacity = '0'
  })
}

onMounted(() => {
  globalThis.document.addEventListener('mousemove', onMousemove)
  globalThis.document.addEventListener('mousedown', onMousedown)
  globalThis.document.addEventListener('mouseup', onMouseup)
  globalThis.document.addEventListener('mouseleave', onMouseleave)
  globalThis.document.addEventListener('mouseenter', onMouseenter)
})

onUnmounted(() => {
  globalThis.document.removeEventListener('mousemove', onMousemove)
  globalThis.document.removeEventListener('mousedown', onMousedown)
  globalThis.document.removeEventListener('mouseup', onMouseup)
  globalThis.document.removeEventListener('mouseleave', onMouseleave)
  globalThis.document.removeEventListener('mouseenter', onMouseenter)
})
</script>

<template>
  <div
    ref="cursor"
    class="page-cursor"
    :class="[cursorType, cursorState]"
  />
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
