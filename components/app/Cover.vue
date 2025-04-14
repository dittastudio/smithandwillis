<script lang="ts" setup>
import IconLogoMark from '@/assets/icons/logo-mark.svg'

const cover = ref<HTMLDivElement>()
const coverVisible = ref(true)
const logoVisible = ref(false)
const transitionComplete = ref(false)

// const header = document.querySelector('.app-header') as HTMLDivElement

onMounted(async () => {
  const header = document.querySelector('.app-header') as HTMLDivElement

  document.documentElement.scrollTo(0, 0)

  header?.classList.add('transition-all')
  header?.classList.add('duration-500')
  header?.classList.add('ease-out')
  header?.classList.add('opacity-0')
  header?.classList.add('-translate-y-4')

  await wait(1000)

  logoVisible.value = true

  await wait(2000)

  coverVisible.value = false

  header?.classList.remove('opacity-0')
  header?.classList.remove('-translate-y-4')

  cover.value?.addEventListener('transitionend', () => {
    transitionComplete.value = true
    header?.classList.remove('transition-all')
    header?.classList.remove('duration-500')
    header?.classList.remove('ease-out')
  })
})
</script>

<template>
  <div
    v-if="!transitionComplete"
    ref="cover"
    class="app-cover fixed inset-0 z-50 flex items-center justify-center pointer-events-none h-dvh text-white"
    :class="[{ 'is-active': coverVisible }]"
  >
    <div class="wrapper">
      <IconLogoMark
        class="app-cover__logo"
        :class="[{ 'is-active': logoVisible }]"
      />
    </div>
  </div>
</template>

<style>
@reference "../../assets/css/main.css";

.app-cover {
  background-color: --alpha(var(--color-black) / 80%);

  &:has(html.is-storyblok-editor) {
    display: none;
  }

  /* html:has(&) .app-header {
    opacity: 0;
    translate: 0 100%;
    transition: opacity 0.5s var(--ease-in-out), translate 0.5s var(--ease-in-out);
  } */

  &.is-active {
    pointer-events: auto;

    html:has(&) {
      overflow: hidden;
    }
  }

  &,
  &__logo {
    opacity: 0;
    transition: opacity 0.5s var(--ease-in-out);

    &.is-active {
      opacity: 1;
    }
  }

  &__logo {
    --logo-responsive-width: 9.75vw;

    width: 9.75vw;
    max-width: 140px;
    height: auto;
  }
}
</style>
