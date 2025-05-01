<script lang="ts" setup>
import IconLogoMark from '@/assets/icons/logo-mark.svg'
// import { useScroll } from '@vueuse/core'

const ready = ref(false)

// const { x, y, isScrolling, arrivedState, directions } = useScroll(window)

onMounted(async () => {
  await wait(500)
  ready.value = true
})
</script>

<template>
  <div
    class="app-cover w-full h-dvh text-white pointer-events-none bg-black/20 opacity-0 transition-opacity duration-1000 ease-out"
    :class="{
      'opacity-100': ready,
    }"
  >
    <div class="wrapper flex items-center justify-center h-full">
      <IconLogoMark class="app-cover__logo" />

      <!-- <pre>
        {{ x }}
        {{ y }}
        {{ isScrolling }}
        {{ arrivedState }}
        {{ directions }}
      </pre> -->
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.app-cover {
  /* transition: opacity 1.5s var(--ease-out); */
}

.app-cover__logo {
  width: 9.75vw;
  min-width: 100px;
  max-width: 140px;
  height: auto;
  /* opacity: 0; */
  /* animation: logo 2.5s 0.5s var(--ease-out) forwards; */
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
