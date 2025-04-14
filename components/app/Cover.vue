<script lang="ts" setup>
import IconLogoMark from '@/assets/icons/logo-mark.svg'

const cover = ref<HTMLDivElement>()
const coverVisible = ref(true)
const logoVisible = ref(false)
const transitionComplete = ref(false)
const hasHero = ref(false)
const isAtTop = ref(true)

// Check if we're at the top of the page
const checkScrollPosition = () => {
  isAtTop.value = window.scrollY === 0
}

// Check if a hero component exists
const checkForHero = () => {
  const hero = document.querySelector('[data-js-hero]')
  hasHero.value = !!hero
}

onMounted(async () => {
  const hero = document.querySelector('[data-js-hero]') as HTMLDivElement
  const header = document.querySelector('[data-js-header]') as HTMLDivElement

  // Check initial conditions
  checkForHero()
  checkScrollPosition()

  // Only proceed if we have a hero and are at the top
  if (!hasHero.value || !isAtTop.value) {
    transitionComplete.value = true
    return
  }

  await wait(1000)

  header?.classList.add('transition-all')
  header?.classList.add('duration-1000')
  header?.classList.add('ease-in-out')

  hero?.classList.add('transition-all')
  hero?.classList.add('duration-1000')
  hero?.classList.add('ease-in-out')

  logoVisible.value = true

  await wait(2000)

  coverVisible.value = false

  header.style.opacity = '1'
  header.style.translate = '0 0 0'

  hero.style.scale = '1'

  cover.value?.addEventListener('transitionend', () => {
    transitionComplete.value = true
  })

  // Listen for scroll events
  window.addEventListener('scroll', checkScrollPosition)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScrollPosition)
})
</script>

<template>
  <div
    v-if="hasHero && isAtTop"
    ref="cover"
    class="app-cover fixed inset-0 z-50 pointer-events-none h-dvh text-white"
    :class="[{ 'is-active': coverVisible }]"
  >
    <div class="wrapper flex items-center justify-center h-full">
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
  background: radial-gradient(circle at center, transparent 0%, --alpha(var(--color-black) / 100%) 50%);

  &:has(html.is-storyblok-editor) {
    display: none;
  }

  &.is-active {
    pointer-events: auto;

    html:has(&) {
      overflow: hidden;
    }
  }

  &,
  &__logo {
    opacity: 0;
    transition: opacity 1s var(--ease-in-out);

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

html:has(.app-cover) {
  [data-js-header] {
    opacity: 0;
    translate: 0 -10% 0;
  }

  [data-js-hero] {
    scale: 1.1;
  }
}

/* [data-js-header] {
  translate: 0 0 0;
  transition: translate 0.5s var(--ease-in-out);
}

html:has(.app-cover) {
  [data-js-header] {
    translate: 0 -100% 0;
  }
} */
</style>
