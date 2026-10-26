<script setup lang="ts">
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
} from 'vue'

const props = withDefaults(defineProps<{
  hideCursorSelector?: string | string[]
}>(), {
  hideCursorSelector: '.hide-page-cursor',
})

const cursor = ref<HTMLElement | null>(null)
const cursorType = shallowRef('auto')
const cursorState = shallowRef('')

const cursorStyle = computed<CSSStyleDeclaration>(() => {
  return cursor.value?.style || {} as CSSStyleDeclaration
})

const hideCursorSelectorList = computed(() => {
  return Array.isArray(props.hideCursorSelector)
    ? props.hideCursorSelector
    : [props.hideCursorSelector]
})

let myReq: number = 0
let pointerX = 0
let pointerY = 0
let pointerTarget: HTMLElement | null = null
// Target resolved in the previous frame: skip getComputedStyle / closest while the target is unchanged,
// so we don't force a style recalc every frame after other components write styles
let resolvedTarget: HTMLElement | null = null
let resolvedHide: boolean | undefined

function resetResolvedTarget() {
  resolvedTarget = null
  resolvedHide = undefined
}

function cancelFrame() {
  if (myReq)
    cancelAnimationFrame(myReq)
  myReq = 0
}

function renderCursor() {
  myReq = 0
  cursorStyle.value.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`

  const target = pointerTarget
  if (!target || target === resolvedTarget)
    return

  resolvedTarget = target
  cursorType.value = getComputedStyle(target)?.cursor || 'auto'

  const hideCursor = hideCursorSelectorList.value.some(item => target.closest(item) !== null)
  if (hideCursor !== resolvedHide) {
    resolvedHide = hideCursor
    cursorStyle.value.opacity = hideCursor ? '0' : '1'
    cursorStyle.value.transition = hideCursor ? '0.2s ease-out' : '0.125s ease-out'
  }
}

function onMousemove(event: MouseEvent) {
  if (!cursor.value)
    return

  pointerX = event.clientX
  pointerY = event.clientY
  pointerTarget = event.target as HTMLElement

  // only handle the latest move per frame
  if (!myReq)
    myReq = requestAnimationFrame(renderCursor)
}

function onMousedown() {
  cursorState.value = 'pressed'
  // pressing / releasing may change the target cursor (e.g. grab -> grabbing); re-resolve on next move
  resolvedTarget = null
}

function onMouseup() {
  cursorState.value = ''
  resolvedTarget = null
}

function onMouseenter() {
  cancelFrame()
  resetResolvedTarget()

  requestAnimationFrame(() => {
    cursorStyle.value.transition = 'none'
    cursorStyle.value.opacity = '1'
  })
}

function onMouseleave() {
  cancelFrame()
  resetResolvedTarget()

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
  cancelFrame()
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
