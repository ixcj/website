<script setup lang="ts">
</script>

<template>
  <div class="section-about">
    <p class="section-title">{{ $t('SectionTitle.about') }}</p>

    <div class="section-about-introduce">
      <div v-html="$t('personalIntroduction')"></div>
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
        margin-bottom: 10px;
        
        &:last-child {
          margin-bottom: 0;
        }
      }

      a {
        text-decoration: none;
        white-space: nowrap;
        color: var(--text-color);
        position: relative;
        z-index: 0;

        &:hover {
          color: var(--bg-color);

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
          background-color: var(--text-color);
          opacity: 0.33;
          z-index: -1;
          transition: var(--transition-duration);
        }
      }
    }
  }
}
</style>
