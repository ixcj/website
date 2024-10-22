<script setup lang="ts">
import Turntable from './Turntable.vue'

// interface Props {
//   data: any,
// }

// const props = withDefaults(defineProps<Props>(), {
//   data: () => ({})
// })
</script>

<template>
  <div class="timeline-turntable">
    <div class="turntable-box">
      <Turntable class="turntable-image" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timeline-turntable {
  --rotateZ: 0deg;
  width: 100%;
  height: 500px;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent 5%, #000 20%, #000 80%, transparent 95%);
  mask-image: linear-gradient(90deg, transparent 5%, #000 20%, #000 80%, transparent 95%);
  
  .turntable-box {
    position: relative;
    top: 0;
    left: 0;
    z-index: 0;
    width: 4400px;
    height: 4400px;
    transform: rotateZ(var(--rotateZ)) translateX(-39%) rotateX(68deg) translateY(-128%) scale(0.6);
    transform-origin: center center;
    
    .turntable-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      --color-text-primary: #f7f8f8;
      --color-linear-plan: #f7f8f8;
    }
  }
}
</style>
