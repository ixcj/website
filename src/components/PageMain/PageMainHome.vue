<script setup lang="ts">
import { mobileThresholdValue } from '@/utils/screen'
import { avatarLink } from '@/config/link'
</script>

<template>
  <div class="page-main-home">
    <div class="personal-info">
      <a :href="avatarLink || 'javascript:void(0)'" target="_blank">
        <img class="avatar" src="/avatar.png" alt="avatar">
      </a>
      <p class="name">{{ $t('name') }}</p>
      <p class="intro">{{ $t('intro') }}</p>
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
  }
}
</style>
