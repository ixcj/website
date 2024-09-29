<script setup lang="ts"></script>

<template>
  <footer class="page-footer">
  </footer>
</template>

<style lang="scss" scoped>
.page-footer {
  width: 100%;
  position: relative;
  min-height:80px;

  &::before {
    content:  '';
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
}
</style>
