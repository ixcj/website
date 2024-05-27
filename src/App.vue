<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { breakpointsName, mobile, touch } from '@/utils/screen'
import PageCursor from '@/components/PageCursor/index.vue'
import PageHeader from '@/components/PageHeader/index.vue'
import PageMain from '@/components/PageMain/index.vue'

const { t } = useI18n()

const title = t('title')
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
    <PageMain />

    <PageCursor v-if="!touch" />
  </div>
</template>

<style lang="scss">
.container {
  min-height: 200vh;
  box-sizing: border-box;
  background-color: var(--bg-color);
  transition: background-color var(--transition-duration);
}
</style>
