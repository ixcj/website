<script setup lang="ts">
import { footerLinks } from '@/config';
</script>

<template>
  <footer class="page-footer">
    <p>© 2024–Present XCJ. All rights reserved.</p>
    <div class="footer-links">
      <a
        v-for="item in footerLinks"
        :href="item.link"
        class="page-link hide-page-cursor"
        target="_blank"
        rel="noopener noreferrer"
      >{{ item.name }}</a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.page-footer {
  width: 100%;
  position: relative;
  min-height: 80px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-top: 1px solid var(--foreground-color);
    width: 100%;
    opacity: 0.1;

    .dark & {
      opacity: 0.2;
    }
  }

  .footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }
}
</style>
