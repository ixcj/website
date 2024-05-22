<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { mobile, mobileThresholdValue } from '@/utils/screen'
import { section } from '@/config/section'
import ThemeSwitch from './ThemeSwitch.vue'

const headerHeight = ref(80)
const mobileHeaderWidth = `${mobileThresholdValue}px`

watchEffect(() => {
  if (mobile.value) {
    headerHeight.value = 50
  } else {
    headerHeight.value = 80
  }

  globalThis.document?.body.style.setProperty('--header-height', `${headerHeight.value}px`)
})

</script>

<template>
  <header class="page-header">
    <div class="page-header-inner">
      <nav class="page-header-nav">
        <ul class="page-header-nav-list">
          <li class="page-header-nav-item" v-for="item in section">
            <a class="page-header-link" :href="`#${item}`">{{ $t(item) }}</a>
          </li>
        </ul>
      </nav>
      <ThemeSwitch />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  transition: var(--transition-duration);
  display: flex;
  justify-content: center;
  align-items: center;

  .page-header-inner {
    border-radius: 999px;
    height: 60%;
    width: 100%;
    max-width: v-bind(mobileHeaderWidth);
    transition: var(--transition-duration);
    background-color: rgba($color: #999, $alpha: .1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba($color: #999, $alpha: .2);

    .mobile & {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }

    .page-header-nav {
      width: calc(100% - 100px);
      height: 100%;
      margin: 0 auto;

      .page-header-nav-list {
        height: 100%;
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;

        .page-header-nav-item {
          display: flex;
          align-items: center;
          padding: 5px 20px;
          
          .page-header-link {
            text-decoration: none;
            color: var(--text-color);
          }
        }
      }
    }
  }
}
</style>
