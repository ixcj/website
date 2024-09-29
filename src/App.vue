<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { siteUrl } from '@/config'
import { breakpointsName, mobile, touch, setScrollBarWidth } from '@/utils/screen'
import { githubContributionUser } from '@/config'
import PageCursor from '@/components/PageCursor/index.vue'
import PageHeader from '@/components/PageHeader/index.vue'
import PageMain from '@/components/PageMain/index.vue'
import PageFooter from '@/components/PageFooter/index.vue'
import { css } from '@/assets/font/MiSans-Normal.ttf?subsets'

const { t } = useI18n()

const title = t('title')
const description = t('description')
const ogImage = `${siteUrl.replace(/\/$/, '')}/og.png`

useHead({
  title,
  htmlAttrs: { lang: t('lang') },
  meta: [
    // HTML Meta Tags
    { name: 'description', content: description },
    { name: 'author', content: t('author') },

    // Open Graph Meta Tags
    { property: 'og:site_name', content: title },
    { property: 'og:url', content: siteUrl },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: ogImage },

    // Twitter Meta Tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:url', content: siteUrl },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
  ],
  link: [
    // 设置了 githubContributionUser 则引入样式
    githubContributionUser ? {
      href: '/css/github-calendar-responsive.css',
      rel: "stylesheet",
      type: "text/css"
    } : {},
  ]
})

const loading = ref(false)

globalThis.onload = () => {
  loading.value = true
  nextTick(() => {
    setScrollBarWidth()
  })
}
</script>

<template>
  <Transition name="fade">
    <div
      v-show="loading"
      class="container"
      :class="[breakpointsName, mobile ? 'mobile' : '']"
      :style="{ fontFamily: css.family }"
    >
      <PageHeader />
      <PageMain />
      <PageFooter />
    </div>
  </Transition>

  <PageCursor v-if="!touch" />
</template>

<style lang="scss">
.container {
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--background-color);
  transition: background-color var(--transition-duration);
  position: relative;
  overflow-x: hidden;

  &::after,
  &::before {
    content: '';
    display: block;
    position: absolute;
    filter: blur(150px);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  &::after {
    top: 100px;
    left: 60%;
    width: 750px;
    height: 750px;
    background-color: rgba($color: #C850C0, $alpha: 0.1);
  }

  &::before {
    top: 200px;
    left: 40%;
    width: 750px;
    height: 750px;
    background-color: rgba($color: #80D0C7, $alpha: 0.125);
  }
}
</style>
