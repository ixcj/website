<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { breakpointsName, mobile } from '@/utils'
import PageCursor from '@/components/PageCursor/index.vue'
import PageHeader from '@/components/PageHeader/index.vue'

const { t } = useI18n()

const title = `${t('title')} | ${t('subTitle')}`

useHead({
  title,
  htmlAttrs: { lang: t('lang') },
  meta: [
    {
      name: 'keywords',
      content: t('keywords'),
    },
    {
      name: 'description',
      content: t('description'),
    },
    {
      name: 'og:title',
      content: title,
    },
  ],
})
</script>

<template>
  <div class="container" :class="[breakpointsName, mobile ? 'mobile' : '']">
    <page-cursor v-if="!mobile" />
    <page-header />
    <div style="cursor: pointer; background-color: burlywood; padding: 50px;">{{ $t('subTitle') }}</div>
  </div>
</template>

<style lang="scss">
.container {
  padding-top: var(--header-height);
  background-color: #ff0;
}
</style>
