<script lang="ts" setup>
import IconLogoMark from '@/assets/icons/logo-mark.svg'

const emit = defineEmits<{
  (e: 'cover-visible', value: boolean): void
}>()

const coverVisible = ref(true)

onMounted(async () => {
  if (window.scrollY < 5) {
    await wait(3000)
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
    rotate: 15deg;
  }
  10%, 90% {
    opacity: 1;
    scale: 1;
    rotate: 0deg;
  }
  100% {
    opacity: 0;
    scale: 0.85;
    rotate: -15deg;
  }
}

.app-cover {
  pointer-events: none;

  &:has(html.is-storyblok-editor) {
    display: none;
  }

  &__logo {
    width: 9.75vw;
    max-width: 140px;
    height: auto;
    opacity: 0;
    animation: sequence 2.5s 0.5s ease-out forwards;
  }
}
</style>
