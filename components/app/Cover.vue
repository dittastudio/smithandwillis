<script lang="ts" setup>
import IconLogoMark from '@/assets/icons/logo-mark.svg'

const coverVisible = useState('coverVisible')

onMounted(async () => {
  if (window.scrollY < 5) {
    coverVisible.value = true
    await wait(1500)
  }

  coverVisible.value = false
})
</script>

<template>
  <div
    class="app-cover fixed inset-0 z-100 h-dvh text-white pointer-events-none opacity-0"
    :class="{
      'is-ready': coverVisible,
    }"
  >
    <div class="wrapper flex items-center justify-center h-full">
      <IconLogoMark class="app-cover__logo" />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

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
  opacity: 0;
  transition: opacity 1.5s var(--ease-out);
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

html:has([data-component="hero"]) .app-cover.is-ready {
  opacity: 1;
  transition: none;
}

html:has([data-component="hero"]):has(.app-cover.is-ready)  {
  overflow: hidden;
}
</style>
