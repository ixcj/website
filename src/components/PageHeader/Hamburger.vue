<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="hamburger" :class="{ active }">
    <span class="hamburger-1"></span>
    <span class="hamburger-2"></span>
    <span class="hamburger-3"></span>
  </div>
  
</template>

<style lang="scss"scoped>
.hamburger {
  cursor: pointer;
  width: 20px;
  height: var(--header-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  &.active {
    .hamburger-1,
    .hamburger-2,
    .hamburger-3 {
      border-radius: 0px;
    }

    .hamburger-1 {
      transform-origin: bottom;
      transform: rotate(45deg) translate(13px);
    }

    .hamburger-2 {
      transform-origin: top;
      transform: rotate(-45deg);
    }

    .hamburger-3 {
      transform-origin: bottom;
      width: 50%;
      transform: translate(2px, -10px) rotate(45deg);
    }
  }

  .hamburger-1,
  .hamburger-2,
  .hamburger-3 {
    width: 100%;
    background-color: var(--text-color);
    border-radius: 10px;
    height: 2px;
    margin: 2px 0;
    transition: var(--transition-duration);
  }

  .hamburger-1 {
    width: 50%;
  }

  .hamburger-3 {
    width: 75%;
  }
}
</style>
