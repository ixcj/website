<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Turntable from './Turntable.vue'

interface Props {
  data: any,
  /** 滑动速度 */
  slidingSpeed?: number
  /** 启用惯性 */
  enablingInertia?: boolean
  /** 惯性衰减率 */
  inertiaDecayRatio?: number
  /** 惯性停止阈值 */
  inertialStopThreshold?: number
  /** 帧间隔 默认按16.6666667毫秒为一帧 */
  frameInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({}),
  slidingSpeed: 0.1,
  enablingInertia: true,
  inertiaDecayRatio: 0.95,
  inertialStopThreshold: 0.01,
  frameInterval: 16.6666667,
})

const timelineTurntableRef = ref<HTMLElement | null>(null)
const timelineTurntableRotateBoxRef = ref<HTMLElement | null>(null)

const isPressed = ref(false)
const rotateZ = ref(0)

let myReq: number = 0
let inertiaReq: number = 0

let pressedDuration = 0
let inertia = 0
let inertiaDirection = 1
let inertiaFrameTaskCompletionTime = 0

const oldPosition: { x: number, y: number } = { x: 0, y: 0 }

function onMousedown(e: MouseEvent) {
  pressedDuration = new Date().getTime()
  inertia = 0
  
  const { clientX, clientY } = e
  oldPosition.x = clientX
  oldPosition.y = clientY
  isPressed.value = true
}

function onMouseup(e: MouseEvent) {
  isPressed.value = false

  if (props.enablingInertia) {
    pressedDuration = new Date().getTime() - pressedDuration
    const { clientX, clientY } = e
    
    const deltaX = clientX - oldPosition.x
    const deltaY = clientY - oldPosition.y
    
    inertia = Math.sqrt(deltaX * deltaX + deltaY * deltaY) * pressedDuration / 1000
    inertiaDirection = deltaX > 0 ? -1 : 1
    
    inertiaFrameTaskCompletionTime = new Date().getTime()
    inertiaReq = requestAnimationFrame(applyInertia)
  }
}

function onMousemove(e: MouseEvent) {
  cancelAnimationFrame(myReq)
  
  if (isPressed.value) {
    const { x, y } = oldPosition
    const { clientX, clientY } = e
    
    myReq = requestAnimationFrame(() => {
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

function applyInertia() {
  cancelAnimationFrame(inertiaReq)
  
  if (Math.abs(inertia) > props.inertialStopThreshold) {
    const now = new Date().getTime()
    const deltaTime = now - inertiaFrameTaskCompletionTime
    const frameRateRatio = deltaTime / props.frameInterval
    const inertiaValue = inertia * inertiaDirection / frameRateRatio
    const inertiaAttenuationValue = inertia * (1 - Math.min(props.inertiaDecayRatio, 1)) * frameRateRatio
    
    rotateZ.value = (rotateZ.value + inertiaValue) % 360
    inertia -= inertiaAttenuationValue
    inertiaFrameTaskCompletionTime = now
    
    inertiaReq = requestAnimationFrame(applyInertia)
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
