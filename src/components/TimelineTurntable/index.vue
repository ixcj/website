<script setup lang="ts">
import type { TimelineTurntableItem } from '@/types/TimelineTurntable'
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  nextTick,
} from 'vue'
import Turntable from './Turntable.vue'
import {
  type TimelineTurntableTransformItem,
  transformTimelineTurntableItem
} from './transform'

interface Props {
  data: TimelineTurntableItem[],
  /** 滑动速度 */
  slidingSpeed?: number
  /** 启用惯性 */
  enablingInertia?: boolean
  /** 惯性速度 */
  inertiaSpeed?: number
  /** 惯性衰减率 */
  inertiaDecayRatio?: number
  /** 惯性停止阈值 */
  inertialStopThreshold?: number
  /** 帧间隔 默认按16.6666667毫秒为一帧 */
  frameInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  slidingSpeed: 0.9,
  enablingInertia: true,
  inertiaSpeed: 0.1,
  inertiaDecayRatio: 0.95,
  inertialStopThreshold: 0.01,
  frameInterval: 16.6666667,
})

const timelineTurntableRef = ref<HTMLElement | null>(null)
const timelineTurntableRotateBoxRef = ref<HTMLElement | null>(null)

const isPressed = ref(false)
const rotateZ = ref(0)

const absRotateZ = computed(() => Math.abs((rotateZ.value >= 0 ? 0 : 360) - (Math.abs(rotateZ.value) % 360)))

const currentItem = computed<TimelineTurntableTransformItem[]>(() => transformTimelineTurntableItem(props.data))
const currentAngleData = computed(() => {
  return currentItem.value.find(item => {
    const [min, max] = item.angleRange
    return absRotateZ.value >= min && absRotateZ.value < max
  })
})

const dateProgress = computed(() => {
  const [min = 0, max = 0] = currentAngleData.value?.angleRange || []
  const progress = (absRotateZ.value - min) / Math.abs(max - min)

  return progress
})

const turntableContentTextBoxRef = ref<HTMLElement>()

const currentAngleDataChildrenItem = computed(() => {
  const { children } = currentAngleData.value || {}

  const data = children?.find((item) => {
    const [min = 0, max = 0] = item.range || []
    return dateProgress.value >= min && dateProgress.value < max
  })

  return data || { title: '', describe: '', range: [0, 0] }
})

const progressPartingLine = computed(() => {
  const data: number[] = []
  currentAngleData.value?.children.map(({ range }) => {
    const [_, max = 1] = range || []

    if (![0, 1].includes(max)) {
      data.push(max)
    }
  })
  
  return data
})

const ResizeObserver = globalThis?.ResizeObserver
const resizeObserver = ResizeObserver && new ResizeObserver(entries => {
  for (const entry of entries) {
    nextTick(() => {
      overflowDetection(entry.target)
    })
  }
})

function overflowDetection(el: Element | HTMLElement) {
  const { scrollHeight, clientHeight } = el
  el.classList.toggle('gradation-bottom', (scrollHeight - clientHeight) > 5)
}

let myReq: number = 0
let inertiaReq: number = 0

let pressedDuration = 0
let inertia = 0
let inertiaDirection = 1
let inertiaFrameTaskCompletionTime = 0

const oldPosition: { x: number, y: number } = { x: 0, y: 0 }

function onMousedown(e: MouseEvent | TouchEvent) {
  e.preventDefault()

  pressedDuration = new Date().getTime()
  inertia = 0
  
  const event = e.type === 'mousedown' ? (e as MouseEvent) : (e as TouchEvent).changedTouches[0]
  const { clientX, clientY } = event

  oldPosition.x = clientX
  oldPosition.y = clientY
  isPressed.value = true
}

function onMouseup(e: MouseEvent | TouchEvent) {
  if (!isPressed.value) return
  
  isPressed.value = false

  if (props.enablingInertia) {
    pressedDuration = new Date().getTime() - pressedDuration

    const event = e.type === 'mouseup' ? (e as MouseEvent) : (e as TouchEvent).changedTouches[0]
    const { clientX, clientY } = event
    
    const deltaX = clientX - oldPosition.x
    const deltaY = clientY - oldPosition.y
    
    inertia = Math.sqrt(deltaX * deltaX + deltaY * deltaY) * pressedDuration / 1000
    inertiaDirection = deltaX > 0 ? -1 : 1
    
    inertiaFrameTaskCompletionTime = new Date().getTime()
    inertiaReq = requestAnimationFrame(applyInertia)
  }
}

function onMousemove(e: MouseEvent | TouchEvent) {
  cancelAnimationFrame(myReq)
  
  if (isPressed.value) {
    const { x, y } = oldPosition

    const event = e.type === 'mousemove' ? (e as MouseEvent) : (e as TouchEvent).changedTouches[0]
    const { clientX, clientY } = event
    
    myReq = requestAnimationFrame(() => {
      if (timelineTurntableRef.value && timelineTurntableRotateBoxRef.value) {
        const { clientWidth } = timelineTurntableRef.value
        const { clientWidth: rotateBoxClientWidth } = timelineTurntableRotateBoxRef.value
        const scale = clientWidth / (rotateBoxClientWidth * (1 - Math.min(props.slidingSpeed, 0.9999)))
        
        const theta = Math.atan2(y, x)
        const mouseTheta = Math.atan2(y, clientX)
        const deltaTheta = mouseTheta - theta
        const deltaThetaDegrees = deltaTheta * (180 / Math.PI)

        oldPosition.x = clientX
        oldPosition.y = clientY

        const _rotateZ = Number(deltaThetaDegrees * scale + rotateZ.value)
        rotateZ.value = isNaN(_rotateZ) ? 0 : _rotateZ
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
    const inertiaValue = inertia * inertiaDirection * props.inertiaSpeed
    const inertiaAttenuationValue = inertia * (1 - Math.min(props.inertiaDecayRatio, 1)) * frameRateRatio
    
    const rotateZValue = rotateZ.value + inertiaValue
    rotateZ.value = isNaN(rotateZValue) ? 0 : rotateZValue

    inertia -= inertiaAttenuationValue
    inertiaFrameTaskCompletionTime = now
    
    inertiaReq = requestAnimationFrame(applyInertia)
  }
}

onMounted(() => {
  turntableContentTextBoxRef.value && resizeObserver?.observe(turntableContentTextBoxRef.value)

  globalThis.document.addEventListener('mousemove', onMousemove)
  timelineTurntableRef.value?.addEventListener('mousedown', onMousedown)
  globalThis.document.addEventListener('mouseup', onMouseup)

  globalThis.document.addEventListener('touchmove', onMousemove)
  timelineTurntableRef.value?.addEventListener('touchstart', onMousedown)
  globalThis.document.addEventListener('touchend', onMouseup)
})

onUnmounted(() => {
  resizeObserver?.disconnect()

  globalThis.document.removeEventListener('mousemove', onMousemove)
  timelineTurntableRef.value?.removeEventListener('mousedown', onMousedown)
  globalThis.document.removeEventListener('mouseup', onMouseup)

  globalThis.document.removeEventListener('touchmove', onMousemove)
  timelineTurntableRef.value?.removeEventListener('touchstart', onMousedown)
  globalThis.document.removeEventListener('touchend', onMouseup)
})
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

        <div class="turntable-rotate-content-box">
        
        </div>
      </div>
    </div>

    <div class="turntable-content-box">
      <div class="turntable-content-date-box">
        <div class="turntable-content-date" :style="{ '--date-progress': dateProgress * 100 + '%' }">
          <span>{{ currentAngleData?.date[0] }}</span>
          <span>{{ currentAngleData?.date[1] }}</span>

          <div v-if="progressPartingLine.length" class="turntable-content-date-parting-line">
            <div
              v-for="n in progressPartingLine"
              class="turntable-content-date-parting-line-item"
              :style="{ '--parting-line-left': n * 100 + '%' }"
            ></div>
          </div>
        </div>
      </div>
      <div class="turntable-content-text-box" ref="turntableContentTextBoxRef">
        <Transition name="fade" mode="out-in">
          <div class="turntable-content-text" :key="JSON.stringify(currentAngleDataChildrenItem)">
            <div class="turntable-content-text-title">{{ currentAngleDataChildrenItem.title }}</div>
            <div class="turntable-content-text-describe" v-html="currentAngleDataChildrenItem.describe"></div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timeline-turntable {
  --rotateZ: calc(v-bind(rotateZ) * 1deg);
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
  cursor: grab;
  -webkit-mask-image: linear-gradient(90deg, transparent 5%, #000 15%, #000 85%, transparent 95%);
  mask-image: linear-gradient(90deg, transparent 5%, #000 15%, #000 85%, transparent 95%);

  &.pressed {
    cursor: grabbing;
  }
  
  .turntable-box {
    pointer-events: none;
    position: relative;
    top: -100%;
    left: 50%;
    z-index: 0;
    width: 4400px;
    height: 4400px;
    transform: translateX(-50%) rotateX(68deg) translateY(-100%) scale(0.6);

    .turntable-rotate-box {
      transform: rotateZ(var(--rotateZ)) translateZ(0);
      transition: transform calc(var(--transition-duration) / 3) linear;

      .turntable-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .turntable-rotate-content-box {
        position: absolute;
        inset: 0;
      }
    }
  }

  .turntable-content-box {
    position: absolute;
    inset: 0;
    pointer-events: none;
    padding: 0 15%;
    user-select: none;

    .turntable-content-date-box {
      font-size: 24px;
      display: flex;
      justify-content: center;

      .turntable-content-date {
        display: flex;
        justify-content: center;
        gap: 50px;
        padding-bottom: 10px;
        position: relative;

        &::after,
        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          display: block;
          height: 3px;
          border-radius: 3px;
          background-color: var(--foreground-color);
        }

        &::after {
          width: 100%;
          opacity: .3;
        }

        &::before {
          width: var(--date-progress, 0%);
        }

        span {
          position: relative;

          &:last-of-type {
            &::before {
              content: '-';
              position: absolute;
              left: -25px;
              transform: translateX(-50%);
            }
          }
        }

        .turntable-content-date-parting-line {
          width: 100%;
          height: 3px;
          position: absolute;
          left: 0;
          bottom: 0;
          overflow: hidden;

          .turntable-content-date-parting-line-item {
            position: absolute;
            height: 100%;
            width: 2px;
            transform: translateX(50%);
            border-radius: 2px;
            background-color: red;
            left: var(--parting-line-left, -999px);
          }
        }
      }
    }

    .turntable-content-text-box {
      margin-top: 20px;
      text-align: center;
      max-height: calc(100% - 210px);
      overflow: hidden;

      &.gradation-bottom {
        overflow-y: auto;
        mask-image: linear-gradient(180deg, #000, #000 calc(100% - 50px), transparent);
        -webkit-mask-image: linear-gradient(180deg, #000, #000 calc(100% - 50px), transparent);
        padding-bottom: 30px;
        box-sizing: border-box;
        pointer-events: all;

        &::-webkit-scrollbar {
          display: none;
        }
      }

      .turntable-content-text {
        .turntable-content-text-title {
          font-size: 28px;
          margin-bottom: 10px;
        }

        .turntable-content-text-describe {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
