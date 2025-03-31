<script setup lang="ts">
import IconLogo from '@/assets/icons/logo.svg'

const menuOpen = useState<boolean>('menuOpen')

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const prevScrollPos = ref<number>(0)
const hasScrolled = ref<boolean>(false)
const hasScrolledUp = ref<boolean>(false)
const hasScrolledDown = ref<boolean>(false)
const raf = ref<any>(null)

const handleScroll = () => {
  const triggerPoint = 50
  const scrollPos = window.scrollY

  hasScrolled.value = scrollPos > triggerPoint

  // Scrolling up
  if (prevScrollPos.value > scrollPos) {
    hasScrolledUp.value = scrollPos > triggerPoint
    hasScrolledDown.value = false
  }
  // Scrolling down
  else {
    hasScrolledUp.value = false
    hasScrolledDown.value = scrollPos > triggerPoint
  }

  prevScrollPos.value = scrollPos

  raf.value = null
}

const rAFHeaderScroll = () => {
  if (!raf.value) {
    raf.value = requestAnimationFrame(handleScroll)
  }
}

onMounted(() => {
  rAFHeaderScroll()
  window.addEventListener('scroll', rAFHeaderScroll)
})

onUnmounted(() => {
  cancelAnimationFrame(raf.value)
  window.removeEventListener('scroll', rAFHeaderScroll)
})

const classesHeader = computed<Record<string, boolean>>(() => ({
  'app-header--is-open': menuOpen.value,
  'app-header--has-scrolled': hasScrolled.value,
  'app-header--has-scrolled-up': hasScrolledUp.value,
  'app-header--has-scrolled-down': hasScrolledDown.value,
}))
</script>

<template>
  <header
    :class="classesHeader"
    class="app-header text-white"
  >
    <div class="app-header__wrapper wrapper py-8 md:py-10">
      <div class="md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
        <button
          type="button"
          class="absolute top-0 left-0 p-8 md:hidden active:opacity-70 transition-opacity duration-300 ease-out pointer-events-auto"
          @click="toggleMenu"
        >
          <UiBurger :is-open="menuOpen" />
        </button>

        <div
          v-if="$slots['navigation-primary']"
          class="mr-auto"
        >
          <slot name="navigation-primary" />
        </div>

        <NuxtLink
          class="block p-6 -my-6 pointer-events-auto"
          to="/"
        >
          <IconLogo
            class="text-orange w-[174px] h-[13px] mx-auto lg:w-[232px] lg:h-[17px]"
          />

          <span class="sr-only">Smith & Willis</span>
        </NuxtLink>

        <div
          v-if="$slots['navigation-secondary']"
          class="ml-auto"
        >
          <slot name="navigation-secondary" />
        </div>
      </div>
    </div>
  </header>
</template>

<style>
@reference "../../assets/css/main.css";

.app-header {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to top,
      --alpha(var(--color-warm-grey) / 0%) 0%,
      --alpha(var(--color-warm-grey) / 100%) 100%
    );
    z-index: -1;
  }
}

.app-header__wrapper {
  opacity: 1;
  translate: 0 0 0;

  transition:
    translate 0s 0s,
    opacity 1s var(--ease-out);

  .app-header--has-scrolled-down & {
    pointer-events: none;
    opacity: 0;
    translate: 0 --spacing(-5) 0;

    transition:
      translate 0.5s var(--ease-in-out),
      opacity 0.5s var(--ease-in-out);
  }
}
</style>
