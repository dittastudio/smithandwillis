<script lang="ts" setup>
import IconLogoMark from '@/assets/icons/logo-mark.svg'

const emit = defineEmits<{
  (e: 'cover-visible', value: boolean): void
}>()

const coverVisible = ref(true)

onMounted(async () => {
  if (window.scrollY < 5) {
    document.documentElement.classList.add('overflow-hidden')
    await wait(3000)
    document.documentElement.classList.remove('overflow-hidden')
  }

  coverVisible.value = false
  emit('cover-visible', false)
})
</script>

<template>
  <div class="app-cover fixed inset-0 z-50 h-dvh text-white">
    <div class="wrapper flex items-center justify-center h-full">
      <IconLogoMark class="app-cover__logo" />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

@keyframes sequence {
  0% {
    opacity: 0;
    scale: 0.95;
    rotate: -6deg;
  }
  25%, 75% {
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
  pointer-events: none;
}

.app-cover__logo {
  width: 9.75vw;
  min-width: 100px;
  max-width: 140px;
  height: auto;
  opacity: 0;
  animation: sequence 2.5s 0.5s var(--ease-out) forwards;
}
</style>

<style lang="postcss">
html.is-storyblok-editor .app-cover {
  display: none;
}
</style>
