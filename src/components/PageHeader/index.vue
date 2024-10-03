<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { mobile, mobileThresholdValue } from '@/utils/screen'
import { sectionList } from '@/config'
import ThemeSwitch from './ThemeSwitch.vue'
import Hamburger from './Hamburger.vue'
import { useI18n } from 'vue-i18n'

const DEFAULT_HEADER_HEIGHT = 80
const MOBILE_HEADER_HEIGHT = 50
const HEADER_INNER_HEIGHT = 48

const headerHeight = ref(DEFAULT_HEADER_HEIGHT)
const menuHamburgerActive = ref(false)
const showMenu = computed(() => menuHamburgerActive.value || !mobile.value)

const { locale } = useI18n()

function handleSwitchLang() {
  const pathname = locale.value === 'en' ? '' : 'en'
  document.location.pathname = pathname
}

watchEffect(() => {
  globalThis?.document?.documentElement.classList.toggle('hide-scroll-bar', menuHamburgerActive.value)
})

watchEffect(() => {
  if (mobile.value) {
    headerHeight.value = MOBILE_HEADER_HEIGHT
  } else {
    headerHeight.value = DEFAULT_HEADER_HEIGHT
    menuHamburgerActive.value = false
  }

  globalThis?.document?.documentElement.style.setProperty('--header-height', `${headerHeight.value}px`)
})
</script>

<template>
  <header class="page-header">
    <div class="page-header-inner">
      <div class="page-header-feature">
        <template v-if="!mobile">
          <span class="switch-lang" @click="handleSwitchLang">{{ $t('language') }}</span>
          <ThemeSwitch />
        </template>

        <Hamburger
          v-else
          :active="menuHamburgerActive"
          class="page-header-hamburger"
          @click="menuHamburgerActive = !menuHamburgerActive"
        />
      </div>

      <nav class="page-header-nav" :class="{ 'mobile-nav': mobile }">
        <Transition name="nav">
          <ul
            v-show="showMenu"
            ref="navList"
            class="page-header-nav-list"
            :class="{ 'column': mobile }"
          >
            <li class="page-header-nav-item" v-for="section in sectionList" @click="menuHamburgerActive = false">
              <a class="page-header-link" :href="`#${section}`">{{ $t(`SectionText.${section}`) }}</a>
            </li>
            <li v-if="mobile" class="page-header-nav-item">
              <span class="switch-lang page-header-link" @click="handleSwitchLang">{{ $t('language') }}</span>
              <ThemeSwitch class="page-header-link" />
            </li>
          </ul>
        </Transition>
      </nav>
    </div>
    <Transition name="opacity">
      <div v-show="mobile && showMenu" class="overlay" @click.stop="menuHamburgerActive = false"></div>
    </Transition>
  </header>
</template>

<style lang="scss" scoped>
.nav-enter-from,
.nav-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}

.page-header {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100vw;
  height: var(--header-height);
  transition: height var(--transition-duration);
  padding-right: var(--scroll-bar-width);
  box-sizing: border-box;
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
        background-color: rgba($color: #aaa, $alpha: .1);
      }
    }
  }

  .page-header-inner {
    position: absolute;
    border-radius: calc(v-bind(HEADER_INNER_HEIGHT) * 1px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: calc(v-bind(HEADER_INNER_HEIGHT) * 1px);
    width: 100%;
    max-width: calc(v-bind(mobileThresholdValue) * 1px);
    min-width: 100px;
    box-sizing: border-box;
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
      --inside: 10px;
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
      gap: 0;
      justify-content: center;
      align-items: center;
      transition: var(--transition-duration) ease;
      text-shadow: 0 0 5px var(--background-color);

      &.column {
        flex-direction: column;
        border-bottom: 1px solid rgba($color: #aaa, $alpha: .3) !important;
        gap: 0px;

        .page-header-nav-item {
          width: 90%;
          border-bottom: 1px solid rgba($color: #aaa, $alpha: .3);

          &:last-of-type {
            border: none;
          }
        }
      }

      .page-header-nav-item {
        display: flex;
        justify-content: center;
        align-items: center;
        
        .page-header-link {
          width: 100%;
          padding: 15px;
          text-decoration: none;
          color: var(--foreground-color);
          transition: color var(--transition-duration);
          text-align: center;
          position: relative;
          z-index: 1;
        }
      }
    }
  }

  .switch-lang {
    cursor: pointer;
    padding: 5px;
    font-size: 14px;
    line-height: 14px;
  }

  .overlay {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(8px);
    transition: opacity var(--transition-duration);
  }
}
</style>
