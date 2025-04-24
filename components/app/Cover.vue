<script lang="ts" setup>
import IconLogoMark from '@/assets/icons/logo-mark.svg'

const emit = defineEmits<{
  (e: 'done'): void
}>()

onMounted(async () => {
  if (window.scrollY < 5) {
    await wait(1500)
  }

  emit('done')
})
</script>

<template>
  <div class="app-cover fixed inset-0 z-100 h-dvh text-white bg-black/50 pointer-events-none">
    <div class="wrapper flex items-center justify-center h-full">
      <IconLogoMark class="app-cover__logo" />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

@keyframes cover {
  0% {
    opacity: 1;
  }
  25%, 50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes logo {
  0% {
    opacity: 0;
    scale: 0.95;
    rotate: -6deg;
  }
  25%, 50% {
    opacity: 1;
    scale: 1;
    rotate: 0deg;
  }
  100% {
    opacity: 0;
    scale: 0.95;
    rotate: 6deg;
  }
}

.app-cover {
  display: none;
  animation: cover 2.5s 0.5s var(--ease-out) forwards;
}

.app-cover__logo {
  width: 9.75vw;
  min-width: 100px;
  max-width: 140px;
  height: auto;
  opacity: 0;
  animation: logo 2.5s 0.5s var(--ease-out) forwards;
}
</style>

<style lang="postcss">
html.is-storyblok-editor .app-cover {
  display: none;
}

html:has([data-component="hero"]) .app-cover {
  display: block;
}
</style>
