<script setup lang="ts">
import { avatarLink } from '@/config/link'
import { mottoLength } from '@/language'
import { useI18n } from 'vue-i18n'
import { useTypewriter } from '@/hooks/useTypewriter'

const { t, locale } = useI18n()

let mottoIndex = getIndex(mottoLength)

const typewriterDelay = 3000
const interval = locale.value === 'zh' ? 50 : 25

const { text, output: motto } = useTypewriter(t(`motto[${mottoIndex}]`), {
  interval,
  backInterval: interval * 0.618,
  callback: () => {
    setTimeout(() => {
      mottoIndex = getIndex(mottoLength, mottoIndex)
      text.value = t(`motto[${mottoIndex}]`)
    }, typewriterDelay)
  }
})

function getIndex(length: number, exclude: number | undefined = undefined) {
  const list = [...Array(length).keys()]

  if (length > 1 && exclude !== undefined) list.splice(exclude, 1)

  return list[Math.floor(Math.random() * list.length)]
}
</script>

<template>
  <div class="section-home">
    <div class="personal-info">
      <a :href="avatarLink || 'javascript: void(0);'" target="_blank">
        <img class="avatar" src="/avatar.png" alt="avatar">
      </a>
      <p class="name">{{ $t('name') }}</p>
      <p class="intro">{{ $t('intro') }}</p>
      <p class="motto" :class="locale">{{ motto }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section-home {
  padding: 30px 0;
  box-sizing: border-box;

  .personal-info {
    position: relative;
    z-index: 1;
    margin: 0 auto;
    width: 100%;
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .avatar {
      width: 100px;
    }

    .name {
      font-size: 28px
    }

    .intro {
      font-size: 20px;
    }

    .motto {
      font-size: 14px;
      max-width: 80%;
      min-height: 50px;
      text-align: center;

      &.en {
        &::after {
          margin-left: 5px;
        }
      }

      &::after {
        content: '|';
        animation: motto-cursor 1s infinite step-start;
      }
    }
  }
  
  @keyframes motto-cursor {
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
}
</style>
