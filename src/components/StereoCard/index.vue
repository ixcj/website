<!-- 参考地址：https://codepen.io/akella/pen/XWYrRmb -->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  data: any,
  speedX?: number,
  speedY?: number,
  bgSpeedX?: number,
  bgSpeedY?: number,
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({}),
  speedX: 10,
  speedY: 10,
  bgSpeedX: 20,
  bgSpeedY: 20,
})

const stereoCardRef = ref<HTMLElement | null>(null)
const cardWrapperRef = ref<HTMLElement | null>(null)

let myReq = 0

let stereoCardRefParams = { top: 0, left: 0, width: 0, height: 0 }
const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    updateStereoCardRefParams(entry.target)
  }
})

function updateStereoCardRefParams(el: Element | HTMLElement) {
  const { top, left } = el.getBoundingClientRect()
  const width = el.clientWidth
  const height = el.clientHeight
  stereoCardRefParams = { top, left, width, height }
}

function setStereoCardRefParams() {
  stereoCardRef.value && updateStereoCardRefParams(stereoCardRef.value)
}

function onMousemove() {
  if (!stereoCardRef.value) return

  stereoCardRef.value.addEventListener('mousemove', (e) => {
    const { top, left, width, height } = stereoCardRefParams

    let X = (e.clientX - left) / width
    let Y = (e.clientY - top) / height

    setCardWrapperRefStyle({ X, Y })
  });
}

function onMouseout() {
  if (!cardWrapperRef.value) return

  setCardWrapperRefStyle({ X: 0.5, Y: 0.5 })
}

function setCardWrapperRefStyle({ X, Y }: { X: number, Y: number }) {
  if (!cardWrapperRef.value) return

  cancelAnimationFrame(myReq)

  const { speedX, speedY, bgSpeedX, bgSpeedY } = props
  
  let rX = -(X - 0.5) * speedX
  let rY = (Y - 0.5) * speedY

  let bgX = 40 + bgSpeedX * X
  let bgY = 40 + bgSpeedY * Y

  myReq = requestAnimationFrame(() => {
    if (!cardWrapperRef.value) return
    
    cardWrapperRef.value.style.setProperty('--x', 100 * X + '%')
    cardWrapperRef.value.style.setProperty('--y', 100 * Y + '%')

    cardWrapperRef.value.style.setProperty('--bg-x', bgX + '%')
    cardWrapperRef.value.style.setProperty('--bg-y', bgY + '%')

    cardWrapperRef.value.style.setProperty('--r-x', rX + 'deg')
    cardWrapperRef.value.style.setProperty('--r-y', rY + 'deg')
  })
}

onMounted(() => {
  stereoCardRef.value && resizeObserver.observe(stereoCardRef.value)
  setCardWrapperRefStyle({ X: 0.5, Y: 0.5 })
  stereoCardRef.value?.addEventListener('mousemove', onMousemove)
  stereoCardRef.value?.addEventListener('mouseout', onMouseout)
  globalThis.addEventListener('resize', setStereoCardRefParams)
  globalThis.addEventListener('scroll', setStereoCardRefParams)
})

onUnmounted(() => {
  resizeObserver.disconnect()
  stereoCardRef.value?.removeEventListener('mousemove', onMousemove)
  stereoCardRef.value?.removeEventListener('mouseout', onMouseout)
  globalThis.removeEventListener('resize', setStereoCardRefParams)
  globalThis.removeEventListener('scroll', setStereoCardRefParams)
})
</script>

<template>
  <div ref="stereoCardRef" class="stereo-card">
    <div ref="cardWrapperRef" class="card-wrapper">
      <div class="card-3d">
        <div class="card-image-box">
          <!-- <img class="card-image" src="http://allyourhtml.club/carousel/image.webp" alt="" /> -->
        </div>
        <div class="card-layer1"></div>
        <div class="card-layer2"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stereo-card {
  width: 100%;
  height: 100%;
  position: relative;
  
  --aspectRatio: 3 / 4;
  --round: 18px;
  --step: 5%;
  --pattern: url("http://allyourhtml.club/carousel/pattern.webp");

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

  .card-wrapper {
    perspective: 600px;
    position: absolute;
    inset: 0;
    border-radius: var(--round);

    .card-3d {
      transform: rotateY(var(--r-x, 0)) rotateX(var(--r-y, 0));
      position: absolute;
      inset: 0;
      clip-path: inset(0 0 0 0 round var(--round));
      overflow: hidden;
      transition: transform calc(var(--transition-duration) / 3) linear;

      &::after {
        content: '';
        position: absolute;
        z-index: 999;
        inset: 0;
        border: 1px solid var(--foreground-color);
        border-radius: var(--round);
        opacity: 0.2;

        .dark & {
          opacity: 0.1;
        }
      }

      .card-image-box {
        width: 100%;
        height: 100%;
        clip-path: inset(0 0 0 0 round var(--round));

        .card-image {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
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
    transition-property: opacity;
    clip-path: inset(0 0 1px 0 round var(--round));

    background-blend-mode: hue, hue, hard-light, overlay;
    background: var(--pattern), var(--rainbow), var(--diagonal);

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
}
</style>
