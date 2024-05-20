<script setup lang="ts">
import { ref } from 'vue'

const headerHeight = ref(80)

globalThis.document?.body.style.setProperty('--header-height', `${headerHeight.value}px`)
</script>

<template>
  <header class="page-header">
    <div class="page-header-inner"></div>
  </header>
</template>

<style lang="scss" scoped>
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  display: flex;
  justify-content: center;
  align-items: center;

  .page-header-inner {
    border-radius: 999px;
    height: 60%;
    width: 600px;
    max-width: 100%;
    transition: 0.125s;
    box-shadow:
      0 10px 15px -3px rgba($color: #000, $alpha: .03),
      0 4px 6px -4px rgba($color: #000, $alpha: .03);
    background-color: rgba($color: #fff, $alpha: .618);
    backdrop-filter: blur(10px);

    .mobile & {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
  }
}
</style>
