<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>

<template>
  <div class="section-about">
    <h2 class="section-title">{{ $t('SectionTitle.about') }}</h2>

    <div class="section-about-introduce">
      <template v-if="locale === 'zh'">
        <p>嗨，我是 <a href="https://blog.xcj.pw/about" target="_blank" class="hide-page-cursor">XCJ</a>！我是一名前端工程师，擅长使用 Vue.js 和 Three.js 以及其他现代 JavaScript 工具来构建酷炫的网页和应用。</p>
        <p>在我的工作中，我总是在寻找将代码的优雅和功能的复杂性完美结合的方法，尤其注重视觉效果与用户体验的和谐。</p>
        <p>在我的<a href="https://blog.xcj.pw" target="_blank" class="hide-page-cursor">个人博客</a>上，我会把我的一些技术心得和职业经历分享给大家。如果你对前端开发感兴趣，或者只是想看看有什么新鲜事，这里可能会有你想要的东西。</p>
        <p>如果您想进一步了解我，欢迎访问我的 <a href="https://github.com/ixcj" target="_blank" class="hide-page-cursor">GitHub</a> 或查看<a href="https://demo.xcj.pw" target="_blank" class="hide-page-cursor">个人项目集</a>。</p>
      </template>
      <template v-else-if="locale === 'en'">
        <p>Hi, I’m <a href="https://blog.xcj.pw/about" target="_blank" class="hide-page-cursor">XCJ</a>！I am a front-end engineer skilled in using Vue.js and Three.js, as well as other modern JavaScript tools, to create amazing web pages and applications.</p>
        <p>In my work, I always strive to perfectly blend the elegance of code with the complexity of functionality, with a special focus on harmonizing visual effects and user experience.</p>
        <p>On my <a href="https://blog.xcj.pw" target="_blank" class="hide-page-cursor">Blog</a>, I share my technical insights and professional experiences. If you're interested in front-end development, or just looking to see what's new, you might find something of interest there.</p>
        <p>If you'd like to learn more about me, feel free to visit my <a href="https://github.com/ixcj" target="_blank" class="hide-page-cursor">GitHub</a> or check out my portfolio of <a href="https://demo.xcj.pw" target="_blank" class="hide-page-cursor">Projects</a>.</p>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section-about {
  .section-about-introduce {
    margin-top: 20px;
    padding: 0 20px;

    ::v-deep() {
      p {
        margin-bottom: 0.75em;
        line-height: 1.4;
        
        &:last-child {
          margin-bottom: 0;
        }
      }

      a {
        text-decoration: none;
        white-space: nowrap;
        color: var(--foreground-color);
        position: relative;
        z-index: 0;
        transition: color var(--transition-duration);

        &:hover {
          color: var(--background-color);

          &::after {
            opacity: 1;
            height: 100%;
          }
        }

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 33%;
          background-color: var(--foreground-color);
          opacity: 0.33;
          z-index: -1;
          transition: var(--transition-duration);
        }
      }
    }
  }
}
</style>
