<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { avatarLink, avatarUrl, githubContributionUser, socialLinks } from '@/config'
import { useTypewriter } from '@/hooks/useTypewriter'
import { mottoLength } from '@/language'

const GITHUB_CALENDAR_WIDTH = 690
const TYPEWRITER_PARAGRAPH_INTERVAL = 5000
const THEME_SWITCH_ANIMATION_NAME_LIST = ['light-to-dark', 'dark-to-light']

let mottoIndex = getIndex(mottoLength)
let mottoTimer: ReturnType<typeof setTimeout> | undefined

const { t, locale } = useI18n()
const TYPEWRITER_OUTPUT_INTERVAL = locale.value === 'zh' ? 50 : 25

const { text, output: motto, pause } = useTypewriter(t(`mottos[${mottoIndex}]`), {
  interval: TYPEWRITER_OUTPUT_INTERVAL,
  backInterval: TYPEWRITER_OUTPUT_INTERVAL * 0.618,
  callback: () => {
    mottoTimer = setTimeout(() => {
      mottoIndex = getIndex(mottoLength, mottoIndex)
      text.value = t(`mottos[${mottoIndex}]`)
    }, TYPEWRITER_PARAGRAPH_INTERVAL)
  },
})

function getIndex(length: number, exclude: number | undefined = undefined) {
  const list = [...Array.from({ length }).keys()]

  if (length > 1 && exclude !== undefined)
    list.splice(exclude, 1)

  return list[Math.floor(Math.random() * list.length)]
}

const loading = shallowRef(true)
let mounted = false

async function setGithubContributionCalendar() {
  if (!githubContributionUser)
    return

  loading.value = true

  try {
    const { default: GitHubCalendar } = await import('github-calendar')

    await GitHubCalendar('#github-contribution-calendar', githubContributionUser, {
      global_stats: false,
      cache: 'no-cache',
      tooltips: false,
      proxy(username: string) {
        return fetch(`https://gh-calendar.xcj.pw/?username=${username}`)
          .then(r => r.text())
      },
    })
  }
  finally {
    if (mounted) {
      loading.value = false

      nextTick(() => {
        const calendarGraphContainer = document.querySelector('.js-calendar-graph > div')

        if (calendarGraphContainer) {
          const toolTipList = Array.from(calendarGraphContainer.querySelectorAll('tool-tip'))
          toolTipList.forEach(item => item.remove())
          toolTipList.splice(0, toolTipList.length)

          const link = document.querySelector('.Link--muted')
          link?.setAttribute('target', '_blank')
        }
      })
    }
  }
}

function handleAnimationStart(event: AnimationEvent) {
  handleThemeSwitchAnimation(event, () => {
    pause(true)
    document.documentElement.classList.add('hide-scroll-bar')
  })
}

function handleAnimationEnd(event: AnimationEvent) {
  handleThemeSwitchAnimation(event, () => {
    pause(false)
    document.documentElement.classList.remove('hide-scroll-bar')
  })
}

function handleThemeSwitchAnimation(event: AnimationEvent, fn: () => void) {
  const { animationName } = event
  if (THEME_SWITCH_ANIMATION_NAME_LIST.includes(animationName)) {
    fn?.()
  }
}

onMounted(() => {
  mounted = true
  setGithubContributionCalendar()
  document.addEventListener('animationstart', handleAnimationStart)
  document.addEventListener('animationend', handleAnimationEnd)
})

onUnmounted(() => {
  mounted = false
  if (mottoTimer)
    clearTimeout(mottoTimer)
  document.removeEventListener('animationstart', handleAnimationStart)
  document.removeEventListener('animationend', handleAnimationEnd)
})
</script>

<template>
  <div class="section-home text-type-box">
    <div class="personal-info">
      <a
        class="avatar-link"
        :href="avatarLink || 'javascript: void(0);'"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img class="avatar" :src="avatarUrl" :alt="$t('name')" loading="eager">
      </a>
      <h1 class="name">
        {{ $t('name') }}
      </h1>
      <p class="intro">
        {{ $t('intro') }}
      </p>
      <p class="motto" :class="locale">
        {{ motto }}
      </p>
    </div>
    <div class="social-links">
      <a
        v-for="link in socialLinks"
        :key="link.link"
        :href="link.link"
        :title="link.name"
        :aria-label="link.name"
        class="link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <component :is="link.icon" class="icon" />
      </a>
    </div>

    <template v-if="githubContributionUser">
      <p class="calendar-title">
        {{ $t('contributionCalendar') }}
      </p>
      <div
        class="calendar-container hide-page-cursor"
        :style="{ '--github-calendar-width': `${GITHUB_CALENDAR_WIDTH}px` }"
      >
        <Transition name="fade">
          <div
            v-show="!loading"
            id="github-contribution-calendar"
            class="contribution-calendar"
          />
        </Transition>
        <Transition name="fade">
          <div v-if="loading" class="contribution-calendar loading" />
        </Transition>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.section-home {
  .personal-info {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    gap: 8px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .avatar-link {
      display: block;
      margin-bottom: 8px;
      border-radius: 50%;
    }

    .avatar {
      display: block;
      width: 104px;
      height: 104px;
      border-radius: 50%;
      box-shadow:
        0 0 0 1px var(--border),
        0 16px 48px -16px rgba($color: #C850C0, $alpha: 0.45);
    }

    .name {
      font-size: 40px;
      line-height: 1.1;
      font-weight: 700;
      letter-spacing: 0.04em;
      margin: 0;

      .xs & {
        font-size: 34px;
      }
    }

    .intro {
      font-size: 18px;
      color: var(--text-muted);
    }

    .motto {
      font-size: 14px;
      line-height: 1.6;
      color: var(--text-subtle);
      max-width: 80%;
      min-height: 50px;
      margin-top: 4px;
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

  .social-links {
    display: flex;
    justify-content: center;
    gap: 12px;

    .link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 1px solid var(--border);
      background-color: var(--surface);
      color: var(--foreground-color);
      transition:
        transform var(--transition-duration),
        background-color var(--transition-duration),
        border-color var(--transition-duration);

      &:hover {
        transform: translateY(-2px);
        background-color: var(--surface-hover);
        border-color: var(--border-strong);
      }

      &:focus-visible {
        border-radius: 50%;
      }

      .icon {
        width: 18px;
        height: 18px;
        color: var(--foreground-color);
      }
    }
  }

  .calendar-title {
    text-align: center;
    margin-top: 48px;
    font-size: 14px;
    letter-spacing: 0.04em;
    color: var(--text-subtle);
  }

  .calendar-container {
    width: calc(100% - 40px);
    min-height: 128px;
    margin: 10px auto 0;
    position: relative;

    .contribution-calendar {
      width: 100%;
      min-height: auto !important;
      margin: 0 auto;

      &.loading {
        width: auto;
        position: absolute;
        inset: 0;
        overflow: hidden;
        border-radius: var(--radius-sm);

        &::after {
          content: '';
          position: absolute;
          inset: 0;
          background-color: var(--foreground-color);
          opacity: 0.05;
        }

        &::before {
          content: '';
          position: absolute;
          inset: -20%;
          background-color: var(--foreground-color);
          animation: shark-wrap 2s infinite;
          transform: translateX(-100%);
          mask-image: linear-gradient(
            45deg,
            transparent 40%,
            rgba(255, 255, 255, 0.05) 50%,
            transparent 60%,
          );

          .dark & {
            mask-image: linear-gradient(
              45deg,
              transparent 40%,
              rgba(255, 255, 255, 0.075) 50%,
              transparent 60%,
            );
          }
        }
      }
    }
  }

  @keyframes motto-cursor {
    50% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes shark-wrap {
    to {
      transform: translateX(100%);
    }
  }
}
</style>
