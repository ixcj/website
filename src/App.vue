<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { breakpointsName, mobile, touch } from '@/utils/screen'
import PageCursor from '@/components/PageCursor/index.vue'
import PageHeader from '@/components/PageHeader/index.vue'

const { t } = useI18n()

const title = `${t('title')} | ${t('subTitle')}`
const description = t('description')

useHead({
  title,
  htmlAttrs: { lang: t('lang') },
  meta: [
    { name: 'og:title', content: title },
    { name: 'description', content: description },
    { name: 'og:description', content: description },
  ],
})
</script>

<template>
  <div class="container" :class="[breakpointsName, mobile ? 'mobile' : '']">
    <PageHeader />
    
    <section class="main">
      {{ $t('subTitle') }}
    </section>

    <PageCursor v-if="!touch" />
  </div>
</template>

<style lang="scss">
.container {
  padding-top: var(--header-height);
  box-sizing: border-box;
  transition: padding var(--transition-duration);
  background-color: var(--bg-color);
  min-height: 100vh;
}
</style>
