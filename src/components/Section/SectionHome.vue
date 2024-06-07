<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { mobileThresholdValue } from '@/utils/screen'
import { avatarLink } from '@/config/link'
import { mottoLength } from '@/language'
import { useI18n } from 'vue-i18n'
import { useTypewriter } from '@/hooks/useTypewriter'

const { t, locale } = useI18n()

const mottoIndex = ref(getIndex(mottoLength))

const typewriterDelay = 3000
const typewriterInterval = locale.value === 'zh' ? 100 : 33

const { text, output } = useTypewriter(t(`motto[${mottoIndex.value}]`), {
  interval: typewriterInterval,
  backInterval: typewriterInterval,
  callback: (type) => {
    if (type === 'output') {
      setTimeout(() => {
        mottoIndex.value = getIndex(mottoLength, mottoIndex.value)
      }, typewriterDelay)
    }
  }
})

watchEffect(() => {
  text.value = t(`motto[${mottoIndex.value}]`)
})

function getIndex(length: number, exclude: number | undefined = undefined) {
  const list = [...Array(length).keys()]

  if (length > 1 && exclude) list.splice(exclude, 1)

  return list[Math.floor(Math.random() * list.length)]
}
</script>

<template>
  <div class="page-main-home">
    <div class="personal-info">
      <a :href="avatarLink || 'javascript:void(0)'" target="_blank">
        <img class="avatar" src="/avatar.png" alt="avatar">
      </a>
      <p class="name">{{ $t('name') }}</p>
      <p class="intro">{{ $t('intro') }}</p>
      <p class="motto">
        <span>{{ output }}</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-main-home {
  padding: 30px 0;
  box-sizing: border-box;

  .personal-info {
    position: relative;
    z-index: 1;
    margin: 0 auto;
    width: 100%;
    max-width: calc(v-bind(mobileThresholdValue) * 1px);
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .avatar {
      width: 100px;
    }

    .name {
      font-size: 24px
    }

    .intro {
      font-size: 18px;
    }

    .motto {
      font-size: 16px;
    }
  }
}
</style>
