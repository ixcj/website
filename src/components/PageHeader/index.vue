<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { mobile, mobileThresholdValue } from '@/utils/screen'
import { section } from '@/config/section'
import ThemeSwitch from './ThemeSwitch.vue'
import Hamburger from './Hamburger.vue'

const headerHeight = ref(80)

const menuHamburgerActive = ref(false)
const showMenu = computed(() => menuHamburgerActive.value || !mobile.value)

function handleSwitchLang() {
  const lang = document.location.pathname.replace(/^\/|\/$/g, '')
  const pathname = lang === 'en' ? '' : 'en'
  document.location.pathname = pathname
}

watchEffect(() => {
  if (mobile.value) {
    headerHeight.value = 50
  } else {
    headerHeight.value = 80
    menuHamburgerActive.value = false
  }

  globalThis.document?.body.style.setProperty('--header-height', `${headerHeight.value}px`)
})
</script>

<template>
  <header class="page-header">
    <div class="page-header-inner">
      <span class="page-header-title">{{ $t('title') }}</span>
      <div class="page-header-feature">
        <ThemeSwitch />
        <span class="switch-lang" @click="handleSwitchLang">{{ $t('language') }}</span>

        <Hamburger
          v-if="mobile"
          :active="menuHamburgerActive"
          class="page-header-hamburger"
          @click="menuHamburgerActive = !menuHamburgerActive"
        />
      </div>
    </div>

    <nav class="page-header-nav">
      <Transition name="nav">
        <ul v-show="showMenu" class="page-header-nav-list">
          <li class="page-header-nav-item" v-for="item in section">
            <a class="page-header-link" :href="`#${item}`">{{ $t(item) }}</a>
          </li>
        </ul>
      </Transition>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.nav-enter-active,
.nav-leave-active {
  transition: var(--transition-duration) ease;
  transform-origin: top;
}

.nav-enter-from,
.nav-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.page-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(v-bind(headerHeight) * 1px);
  transition: height var(--transition-duration);
  display: flex;
  justify-content: center;
  align-items: center;

  .mobile & {
    .page-header-inner {
      width: 100%;
      height: 100%;
      border-radius: 0;
      border-color: rgba($color: #aaa, $alpha: .1);

      .page-header-title {
        opacity: 1;
      }

      .page-header-feature {
        justify-content: flex-start;

        .page-header-hamburger {
          opacity: 1;
        }
      }
    }

    .page-header-nav {
      height: auto;
      z-index: -1;
      padding-top: calc(v-bind(headerHeight) * 1px);
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transition: padding-top var(--transition-duration);

      .page-header-nav-list {
        padding: 15px 0;
        background-color: rgba($color: #aaa, $alpha: .1);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba($color: #aaa, $alpha: .3) !important;
      }
    }
  }

  .page-header-inner {
    position: absolute;
    border-radius: 999px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    width: 100%;
    max-width: calc(v-bind(mobileThresholdValue) * 1px);
    min-width: 300px;
    border: 1px solid rgba($color: #aaa, $alpha: .3);
    border-bottom-color: rgba($color: #aaa, $alpha: .3) !important;
    background-color: rgba($color: #aaa, $alpha: .1);
    backdrop-filter: blur(10px);
    transition: var(--transition-duration);
    
    .page-header-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity var(--transition-duration);
    }

    .page-header-feature {
      --inside: 15px;
      position: absolute;
      inset: 0;
      z-index: 999;
      display: flex;
      gap: 7px;
      justify-content: space-between;
      align-items: center;
      pointer-events: none;
      padding: 0 var(--inside);

      & > * {
        pointer-events: all;
      }

      .switch-lang {
        cursor: pointer;
      }

      .page-header-hamburger {
        position: absolute;
        right: var(--inside);
        opacity: 0;
        transition: opacity var(--transition-duration);
      }
    }
  }

  .page-header-nav {
    height: 100%;
    margin: 0 auto;
    z-index: 0;

    .page-header-nav-list {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      align-items: center;

      .page-header-nav-item {
        display: flex;
        align-items: center;
        
        .page-header-link {
          padding: 5px 20px;
          text-decoration: none;
          color: var(--text-color);
          transition: color var(--transition-duration);
        }
      }
    }
  }
}
</style>
