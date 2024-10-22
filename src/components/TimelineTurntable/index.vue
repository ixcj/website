<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Turntable from './Turntable.vue'

interface Props {
  data: any,
  slidingSpeed?: number
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({}),
  slidingSpeed: 0.1
})

const timelineTurntableRef = ref<HTMLElement | null>(null)
const timelineTurntableRotateBoxRef = ref<HTMLElement | null>(null)

const isPressed = ref(false)
const rotateZ = ref(0)

let myReq: number = 0

const oldPosition: { x: number, y: number } = { x: 0, y: 0 }

function onMousedown(e: MouseEvent) {
  oldPosition.x = e.clientX
  oldPosition.y = e.clientY
  isPressed.value = true
}

function onMouseup() {
  isPressed.value = false
}

function onMousemove(e: MouseEvent) {
  cancelAnimationFrame(myReq)
  
  if (isPressed.value) {
    const { x, y } = oldPosition
    const { clientX, clientY } = e
    
    requestAnimationFrame(() => {
      if (timelineTurntableRef.value && timelineTurntableRotateBoxRef.value) {
        const { clientWidth } = timelineTurntableRef.value
        const { clientWidth: rotateBoxClientWidth } = timelineTurntableRotateBoxRef.value
        const scale = clientWidth / (rotateBoxClientWidth * props.slidingSpeed)
        
        const theta = Math.atan2(y, x)
        const mouseTheta = Math.atan2(clientY, clientX)

        const deltaTheta = mouseTheta - theta
        const deltaThetaDegrees = deltaTheta * (180 / Math.PI)
        oldPosition.x = clientX
        oldPosition.y = clientY

        rotateZ.value = (deltaThetaDegrees * scale + rotateZ.value) % 360
      }
    })
  }
}

onMounted(() => {
  globalThis.document.addEventListener('mousemove', onMousemove)
  globalThis.document.addEventListener('mousedown', onMousedown)
  globalThis.document.addEventListener('mouseup', onMouseup)
})

onUnmounted(() => {})
</script>

<template>
  <div
    class="timeline-turntable"
    ref="timelineTurntableRef"
    :class="{ pressed: isPressed }"
  >
    <div class="turntable-box">
      <div class="turntable-rotate-box" ref="timelineTurntableRotateBoxRef">
        <Turntable class="turntable-image" />

        <div class="turntable-content-box">
        
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timeline-turntable {
  --rotateZ: calc(v-bind(rotateZ) * 1deg);
  width: 100%;
  height: 500px;
  overflow: hidden;
  cursor: grab;
  -webkit-mask-image: linear-gradient(90deg, transparent 5%, #000 20%, #000 80%, transparent 95%);
  mask-image: linear-gradient(90deg, transparent 5%, #000 20%, #000 80%, transparent 95%);

  &.pressed {
    cursor: grabbing;
  }
  
  .turntable-box {
    position: relative;
    top: -100%;
    left: 50%;
    z-index: 0;
    width: 4400px;
    height: 4400px;
    transform: translateX(-50%) rotateX(68deg) translateY(-100%) scale(0.6);

    .turntable-rotate-box {
      transform: rotateZ(var(--rotateZ)) translateZ(0);

      .turntable-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .turntable-content-box {
        position: absolute;
        inset: 0;
      }
    }
  }
}
</style>
