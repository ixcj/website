<!-- 效果是'借鉴'的，借鉴地址：https://codepen.io/akella/pen/XWYrRmb -->

<script setup lang="ts">
import type { StereoCardItem } from '@/types/StereoCard'
import { Github } from '@vicons/fa'
import { ArrowUpRight, ExternalLink } from '@vicons/tabler'
import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue'
import defaultBackground from '@/assets/images/stereo-card-bg.webp'
import defaultPattern from '@/assets/images/stereo-card-pattern.webp'

interface Props {
  data: StereoCardItem
  speedX?: number
  speedY?: number
  bgSpeedX?: number
  bgSpeedY?: number
  contentFloatStrength?: number
  perspectiveReboundStrength?: number
  perspectiveReboundCount?: number
  perspectiveReboundSpeed?: number
  iconMap?: Record<string, any>
  enableExternalData?: boolean
  externaData?: {
    X: number
    Y: number
  }
}

const props = withDefaults(defineProps<Props>(), {
  speedX: 10,
  speedY: 10,
  bgSpeedX: 20,
  bgSpeedY: 20,
  contentFloatStrength: 6,
  perspectiveReboundStrength: 0.35,
  perspectiveReboundCount: 4,
  perspectiveReboundSpeed: 160,
  iconMap: () => ({
    _GITHUB_: Github,
    _ARROW_UP_RIGHT_: ArrowUpRight,
    _EXTERNAL_LINK_: ExternalLink,
  }),
  enableExternalData: false,
  externaData: () => ({ X: 0, Y: 0 }),
})

const stereoCardRef = ref<HTMLElement>()
const cardWrapperRef = ref<HTMLElement>()

let myReq = 0
let externalDataReq = 0
let reboundTimer: ReturnType<typeof globalThis.setTimeout> | undefined

// The card rect is only needed on mousemove: scroll / resize just mark it dirty and it is re-read lazily,
// instead of every card calling getBoundingClientRect synchronously on every scroll event
let stereoCardRefParams = { top: 0, left: 0, width: 0, height: 0 }
let stereoCardRefParamsDirty = true
const ResizeObserver = globalThis?.ResizeObserver
const resizeObserver = ResizeObserver && new ResizeObserver(markStereoCardRefParamsDirty)

function markStereoCardRefParamsDirty() {
  stereoCardRefParamsDirty = true
}

function getStereoCardRefParams() {
  if (stereoCardRefParamsDirty && stereoCardRef.value) {
    const { top, left, width, height } = stereoCardRef.value.getBoundingClientRect()
    stereoCardRefParams = { top, left, width, height }
    stereoCardRefParamsDirty = false
  }

  return stereoCardRefParams
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getReboundAttenuation(index: number, count: number) {
  return 1 - index / count
}

function clearReboundTimer() {
  if (!reboundTimer)
    return

  globalThis.clearTimeout(reboundTimer)
  reboundTimer = undefined
}

function onMousemove(e: MouseEvent) {
  if (props.enableExternalData)
    return

  clearReboundTimer()

  const { top, left, width, height } = getStereoCardRefParams()
  if (!width || !height)
    return

  const X = (e.clientX - left) / width
  const Y = (e.clientY - top) / height

  setCardWrapperRefStyle({ X, Y })
}

function onMouseout() {
  if (!cardWrapperRef.value)
    return

  const { perspectiveReboundStrength, perspectiveReboundCount, perspectiveReboundSpeed, speedX, speedY } = props
  if (perspectiveReboundStrength <= 0 || perspectiveReboundCount <= 0 || !speedX || !speedY) {
    setCardWrapperRefStyle({ X: 0.5, Y: 0.5 })
    return
  }

  const currentOffsetX = -((Number.parseFloat(cardWrapperRef.value.style.getPropertyValue('--r-x')) || 0) / speedX)
  const currentOffsetY = (Number.parseFloat(cardWrapperRef.value.style.getPropertyValue('--r-y')) || 0) / speedY
  const reboundCount = Math.round(perspectiveReboundCount)
  const reboundSpeed = Math.max(16, perspectiveReboundSpeed)

  function runRebound(index: number) {
    if (index >= reboundCount) {
      setCardWrapperRefStyle({ X: 0.5, Y: 0.5 })
      reboundTimer = undefined
      return
    }

    const direction = index % 2 === 0 ? -1 : 1
    const attenuation = getReboundAttenuation(index, reboundCount)
    setCardWrapperRefStyle({
      X: 0.5 + currentOffsetX * direction * attenuation,
      Y: 0.5 + currentOffsetY * direction * attenuation,
    })

    reboundTimer = globalThis.setTimeout(() => runRebound(index + 1), reboundSpeed)
  }

  clearReboundTimer()
  runRebound(0)
}

function setCardWrapperRefStyle({ X, Y }: { X: number, Y: number }) {
  if (!cardWrapperRef.value)
    return

  cancelAnimationFrame(myReq)

  const { speedX, speedY, bgSpeedX, bgSpeedY, contentFloatStrength } = props

  const boundedX = clamp(X, 0, 1)
  const boundedY = clamp(Y, 0, 1)

  const rX = -(X - 0.5) * speedX
  const rY = (Y - 0.5) * speedY

  const bgX = 40 + bgSpeedX * X
  const bgY = 40 + bgSpeedY * Y

  const contentFloatX = -(boundedX - 0.5) * contentFloatStrength
  const contentFloatY = -(boundedY - 0.5) * contentFloatStrength
  const contentFloatZ = Math.max(contentFloatStrength, 0)

  myReq = requestAnimationFrame(() => {
    if (!cardWrapperRef.value)
      return

    cardWrapperRef.value.style.setProperty('--x', `${100 * X}%`)
    cardWrapperRef.value.style.setProperty('--y', `${100 * Y}%`)

    cardWrapperRef.value.style.setProperty('--bg-x', `${bgX}%`)
    cardWrapperRef.value.style.setProperty('--bg-y', `${bgY}%`)

    cardWrapperRef.value.style.setProperty('--r-x', `${rX}deg`)
    cardWrapperRef.value.style.setProperty('--r-y', `${rY}deg`)

    cardWrapperRef.value.style.setProperty('--content-float-x', `${contentFloatX}px`)
    cardWrapperRef.value.style.setProperty('--content-float-y', `${contentFloatY}px`)
    cardWrapperRef.value.style.setProperty('--content-float-z', `${contentFloatZ}px`)
  })
}

function loopSetCardWrapperRefStyle() {
  if (!props.enableExternalData)
    return

  cancelAnimationFrame(externalDataReq)
  externalDataReq = requestAnimationFrame(() => {
    const { X, Y } = props.externaData
    setCardWrapperRefStyle({ X, Y })

    if (props.enableExternalData)
      loopSetCardWrapperRefStyle()
  })
}

function isPrimaryLink(content: string) {
  return content === '_EXTERNAL_LINK_'
}

function getLogoUrl(data: StereoCardItem) {
  const isExternal = data.logo.startsWith('http')
  return (isExternal ? '' : import.meta.env.BASE_URL) + data.logo
}

function getIconComponent(iconName: string) {
  return props.iconMap[iconName]
}

onMounted(() => {
  if (stereoCardRef.value)
    resizeObserver?.observe(stereoCardRef.value)

  setCardWrapperRefStyle({ X: 0.5, Y: 0.5 })
  if (props.enableExternalData) {
    loopSetCardWrapperRefStyle()
  }
  else {
    stereoCardRef.value?.addEventListener('mousemove', onMousemove)
    stereoCardRef.value?.addEventListener('mouseout', onMouseout)
  }

  globalThis.addEventListener('resize', markStereoCardRefParamsDirty, { passive: true })
  globalThis.addEventListener('scroll', markStereoCardRefParamsDirty, { passive: true })
})

onUnmounted(() => {
  clearReboundTimer()
  cancelAnimationFrame(myReq)
  cancelAnimationFrame(externalDataReq)

  resizeObserver?.disconnect()
  stereoCardRef.value?.removeEventListener('mousemove', onMousemove)
  stereoCardRef.value?.removeEventListener('mouseout', onMouseout)
  globalThis.removeEventListener('resize', markStereoCardRefParamsDirty)
  globalThis.removeEventListener('scroll', markStereoCardRefParamsDirty)
})
</script>

<template>
  <article ref="stereoCardRef" class="stereo-card" :style="{ '--pattern': `url(${data?.patternImage || defaultPattern})` }">
    <div ref="cardWrapperRef" class="card-wrapper">
      <div class="card-3d">
        <div class="card-surface" aria-hidden="true">
          <div class="card-image-box">
            <img
              class="card-image"
              :src="data?.backgroundImage || defaultBackground"
              alt=""
              loading="lazy"
              crossorigin="anonymous"
              referrerpolicy="no-referrer"
            >
          </div>
          <div class="card-layer1" />
          <div class="card-layer2" />
        </div>

        <div class="content-wrapper">
          <div class="content-float-wrapper">
            <header class="content-head">
              <img
                v-if="data.logo"
                :src="getLogoUrl(data)"
                class="content-logo"
                alt=""
                loading="lazy"
                crossorigin="anonymous"
                referrerpolicy="no-referrer"
              >
              <div class="content-head-text">
                <h3 class="content-name">
                  {{ data.name }}
                </h3>
                <ul v-if="data.tags.length" class="content-tag-box">
                  <li
                    v-for="tag in data.tags"
                    :key="tag.content"
                    class="content-tag-item"
                    :class="tag.type || ''"
                    :style="tag?.style || {}"
                  >
                    {{ tag.content }}
                  </li>
                </ul>
              </div>
            </header>

            <div class="content-description" v-html="data.description" />

            <footer v-if="data.links.length" class="content-link-box">
              <a
                v-for="link in data.links"
                :key="`${link.href}-${link.content}`"
                class="content-link-item hide-page-cursor"
                :class="{ primary: isPrimaryLink(link.content) }"
                target="_blank"
                rel="noopener noreferrer"
                :href="link.href"
              >
                <component
                  :is="getIconComponent(link.content)"
                  v-if="getIconComponent(link.content)"
                  class="content-link-item-icon"
                  aria-hidden="true"
                />
                <img v-else-if="link.type === 'image'" class="content-link-item-icon" :src="link.content" alt="">
                <span>{{ link.title || link.content }}</span>
              </a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.stereo-card {
  position: relative;
  width: 100%;
  height: 100%;

  --round: var(--radius-lg, 16px);
  --step: 5%;

  // —— 卡面色板：亮色为珍珠白镭射，暗色为深蓝镭射 ——
  --card-fg: #121530;
  --card-fg-muted: rgba(18, 21, 48, 0.74);
  --card-edge: rgba(18, 21, 48, 0.1);
  --card-shadow: 0 1px 2px rgba(18, 21, 48, 0.06), 0 16px 32px -20px rgba(70, 50, 140, 0.4);
  --card-shadow-hover: 0 2px 4px rgba(18, 21, 48, 0.06), 0 26px 44px -22px rgba(70, 50, 140, 0.5);
  --card-logo-ring: rgba(255, 255, 255, 0.9);
  --btn-fg: var(--card-fg);
  --btn-bg: rgba(255, 255, 255, 0.6);
  --btn-bg-hover: rgba(255, 255, 255, 0.92);
  --btn-border: rgba(18, 21, 48, 0.14);
  --btn-primary-fg: #f7f8f8;
  --btn-primary-bg: #121530;
  --btn-primary-bg-hover: #2b2f5e;
  --tone-success: #17733a;
  --tone-warning: #8f4f00;
  --tone-danger: #b0252d;
  --tone-default: var(--card-fg-muted);

  .dark & {
    --card-fg: #f7f8f8;
    --card-fg-muted: rgba(247, 248, 248, 0.78);
    --card-edge: rgba(255, 255, 255, 0.12);
    --card-shadow: 0 16px 36px -22px rgba(92, 104, 255, 0.45);
    --card-shadow-hover: 0 26px 48px -22px rgba(112, 120, 255, 0.6);
    --card-logo-ring: rgba(255, 255, 255, 0.16);
    --btn-bg: rgba(255, 255, 255, 0.08);
    --btn-bg-hover: rgba(255, 255, 255, 0.18);
    --btn-border: rgba(255, 255, 255, 0.22);
    --btn-primary-fg: #0b1030;
    --btn-primary-bg: #f7f8f8;
    --btn-primary-bg-hover: #ffffff;
    --tone-success: #8ee3a5;
    --tone-warning: #f5c27e;
    --tone-danger: #ff9e9e;
  }

  --rainbow: repeating-linear-gradient(
      0deg,
      rgb(255, 119, 115) calc(var(--step) * 1),
      rgba(255, 237, 95, 1) calc(var(--step) * 2),
      rgba(168, 255, 95, 1) calc(var(--step) * 3),
      rgba(131, 255, 247, 1) calc(var(--step) * 4),
      rgba(120, 148, 255, 1) calc(var(--step) * 5),
      rgb(216, 117, 255) calc(var(--step) * 6),
      rgb(255, 119, 115) calc(var(--step) * 7)
    )
    0% var(--bg-y, 0) / 200% 700%;
  --diagonal: repeating-linear-gradient(
      128deg,
      #0e152e 0%,
      hsl(180, 10%, 60%) 3.8%,
      hsl(180, 10%, 60%) 4.5%,
      hsl(180, 10%, 60%) 5.2%,
      #0e152e 10%,
      #0e152e 12%
    )
    var(--bg-x, 0) var(--bg-y, 0) / 300%;
  --shade: radial-gradient(
      farthest-corner circle at var(--x, 0) var(--y, 0),
      rgba(255, 255, 255, 0.1) 12%,
      rgba(255, 255, 255, 0.15) 20%,
      rgba(255, 255, 255, 0.25) 120%
    )
    var(--bg-x, 0) var(--bg-y, 0) / 300%;
}

// —— 外壳：负责悬停抬起；投影层与 card-3d 共用同一组倾斜变量，一起做 3D 变换 ——
.card-wrapper {
  position: relative;
  height: 100%;
  // 不用 preserve-3d：投影层与卡面共面，按 DOM 顺序绘制，避免叠层闪烁
  perspective: 900px;
  border-radius: var(--round);
  transition: transform var(--transition-duration) cubic-bezier(0.22, 1, 0.36, 1);

  // 投影：card-3d 有 clip-path 会裁掉自身阴影，所以放在下层并同步旋转
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--round);
    box-shadow: var(--card-shadow);
    transform: rotateY(var(--r-x, 0)) rotateX(var(--r-y, 0));
    transition:
      transform calc(var(--transition-duration) / 3) linear,
      box-shadow var(--transition-duration);
    pointer-events: none;
  }

  @media (hover: hover) {
    .stereo-card:hover & {
      transform: translateY(-4px);

      &::before {
        box-shadow: var(--card-shadow-hover);
      }
    }
  }
}

.card-3d {
  position: relative;
  height: 100%;
  transform: rotateY(var(--r-x, 0)) rotateX(var(--r-y, 0));
  transform-style: preserve-3d;
  clip-path: inset(0 0 0 0 round var(--round));
  overflow: hidden;
  border-radius: var(--round);
  transition: transform calc(var(--transition-duration) / 3) linear;
  pointer-events: none;

  // 描边
  &::after {
    content: '';
    position: absolute;
    z-index: 1000;
    inset: 0;
    border: 1px solid var(--card-edge);
    border-radius: var(--round);
    pointer-events: none;
  }

  // 跟随指针的高光
  &::before {
    content: '';
    position: absolute;
    z-index: 999;
    inset: 0;
    background: radial-gradient(
      farthest-corner circle at var(--x, 50%) var(--y, 50%),
      rgba(255, 255, 255, 1) 0,
      rgba(255, 255, 255, 0.6) 30%,
      rgb(255, 255, 255, 0) 100%
    );
    mix-blend-mode: hard-light;
    opacity: 0.15;
    pointer-events: none;
  }
}

// —— 镭射底面 ——
.card-surface {
  position: absolute;
  inset: 0;

  // 亮色：品牌紫 / 青的珍珠光泽，随指针位置轻微流动
  :root:not(.dark) &::after {
    content: '';
    position: absolute;
    z-index: 40;
    inset: 0;
    background:
      radial-gradient(120% 90% at var(--x, 30%) var(--y, 20%), rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0) 60%),
      linear-gradient(135deg, rgba(200, 80, 192, 0.16), rgba(128, 208, 199, 0.18) 55%, rgba(120, 148, 255, 0.16));
  }
}

.card-image-box {
  position: absolute;
  inset: 0;
  clip-path: inset(0 0 0 0 round var(--round));
  background: #0e152e;

  .card-image {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
    // 亮色：把深蓝底片反相成带冷紫调的珍珠白，保留原纹理
    filter: invert(1) hue-rotate(180deg) saturate(0.85);

    .dark & {
      filter: none;
    }
  }

  :root:not(.dark) & {
    background: #eef0fb;
  }
}

.card-layer1 {
  position: absolute;
  inset: 0;
  z-index: 20;
  mix-blend-mode: soft-light;
  clip-path: inset(0 0 1px 0 round var(--round));
  background: radial-gradient(
    rgba(255, 255, 255, 0.8) 10%,
    rgba(255, 255, 255, 0.65) 20%,
    rgba(255, 255, 255, 0) 60%
  );
  background-size: 200% 200%;
  background-repeat: no-repeat;
  background-position: calc(100% - var(--x, 0)) calc(100% - var(--y, 0));
  transition: background-position calc(var(--transition-duration) / 3) linear;

  .dark & {
    filter: brightness(0.75);
  }
}

.card-layer2 {
  position: absolute;
  inset: 0;
  z-index: 30;
  mix-blend-mode: color-dodge;
  will-change: background;
  clip-path: inset(0 0 1px 0 round var(--round));
  background-blend-mode: hue, hue, hard-light, overlay;
  background: var(--pattern), var(--rainbow), var(--diagonal);

  // 亮色底上 color-dodge 会直接冲白，改用正片叠底留下淡彩虹光泽
  :root:not(.dark) & {
    mix-blend-mode: multiply;
    opacity: 0.2;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--pattern), var(--rainbow), var(--diagonal), var(--shade);
    mix-blend-mode: exclusion;
    background-size: cover, 200% 400%, 800%, 200%;
    background-position: center, 0% var(--bg-y, 0),
      calc(var(--bg-x, 0) * -1) calc(var(--bg-y, 0) * -1), var(--bg-x, 0) var(--bg-y, 0);
    background-blend-mode: soft-light, hue, hard-light;
    transition: background-position calc(var(--transition-duration) / 3) linear;
  }
}

// —— 内容 ——
.content-wrapper {
  position: relative;
  z-index: 999;
  height: 100%;
  transform-style: preserve-3d;
  pointer-events: all;
  color: var(--card-fg);
}

.content-float-wrapper {
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
  min-height: 248px;
  padding: 24px 24px 22px;
  box-sizing: border-box;
  transform: translate3d(var(--content-float-x, 0), var(--content-float-y, 0), var(--content-float-z, 0));
  transform-style: preserve-3d;
  transition: transform calc(var(--transition-duration) / 3) linear;

  .dark & {
    filter: drop-shadow(0 6px 14px rgba($color: #000, $alpha: .28));
  }

  .xs & {
    min-height: 0;
    padding: 20px 20px 18px;
  }
}

.content-head {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.content-logo {
  flex: none;
  width: 52px;
  height: 52px;
  object-fit: contain;
  border-radius: 50%;
  box-shadow: 0 0 0 3px var(--card-logo-ring);

  .xs & {
    width: 46px;
    height: 46px;
  }
}

.content-head-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  min-width: 0;
}

.content-name {
  max-width: 100%;
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  .xs & {
    font-size: 18px;
  }
}

.content-tag-box {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.content-tag-item {
  --tone: var(--tone-default);

  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 9px;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  color: var(--tone);
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--tone) 40%, transparent);
  background: color-mix(in srgb, var(--tone) 12%, transparent);

  &::before {
    content: '';
    flex: none;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }

  &.success {
    --tone: var(--tone-success);
  }

  &.warning {
    --tone: var(--tone-warning);
  }

  &.danger {
    --tone: var(--tone-danger);
  }
}

.content-description {
  flex: 1;
  font-size: 15px;
  line-height: 1.7;
  color: var(--card-fg-muted);

  :deep(p) {
    margin-bottom: 5px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.content-link-box {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 2px;
}

.content-link-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 36px;
  padding: 0 14px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  color: var(--btn-fg);
  border-radius: 999px;
  border: 1px solid var(--btn-border);
  background: var(--btn-bg);
  backdrop-filter: blur(6px);
  transition:
    background-color var(--transition-duration),
    border-color var(--transition-duration),
    color var(--transition-duration),
    transform 0.12s ease;

  &:hover {
    background: var(--btn-bg-hover);
  }

  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    border-radius: 999px;
  }

  &.primary {
    color: var(--btn-primary-fg);
    border-color: transparent;
    background: var(--btn-primary-bg);

    &:hover {
      background: var(--btn-primary-bg-hover);
    }
  }

  .content-link-item-icon {
    flex: none;
    width: 16px;
    height: 16px;
    object-fit: cover;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card-wrapper,
  .card-wrapper::before,
  .card-3d,
  .content-float-wrapper,
  .content-link-item {
    transition: none;
  }

  .card-wrapper {
    .stereo-card:hover & {
      transform: none;
    }
  }
}
</style>
