<script lang="ts" setup>
import IconLogoMark from '@/assets/icons/logo-mark.svg'

const emit = defineEmits<{
  (e: 'cover-visible', value: boolean): void
}>()

const coverVisible = ref(true)

onMounted(async () => {
  if (window.scrollY < 5) {
    await wait(2000)
  }

  coverVisible.value = false
  emit('cover-visible', false)
})
</script>

<template>
  <div
    class="app-cover fixed inset-0 z-50 h-dvh text-white"
    :class="{ 'is-visible': coverVisible }"
  >
    <div class="wrapper flex items-center justify-center h-full">
      <IconLogoMark class="app-cover__logo" />
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/css/main.css";

.app-cover {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s var(--ease-in-out);

  &:has(html.is-storyblok-editor) {
    display: none;
  }

  &.is-visible {
    opacity: 1;
  }
}

.app-cover__logo {
  width: 9.75vw;
  max-width: 140px;
  height: auto;
}
</style>
