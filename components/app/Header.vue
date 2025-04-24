<script setup lang="ts">
import type { LinkStoryblok, RichtextStoryblok } from '@/types/storyblok'

import IconLogo from '@/assets/icons/logo.svg'

interface Props {
  primaryNavigation: LinkStoryblok[] | undefined
  secondaryNavigation: LinkStoryblok[] | undefined
  studioTitle?: string
  studio?: RichtextStoryblok
  contactTitle?: string
  contact?: RichtextStoryblok
}

const { primaryNavigation, secondaryNavigation, studioTitle, studio, contactTitle, contact } = defineProps<Props>()

const coverVisible = useState<boolean>('coverVisible')
const menuOpen = useState<boolean>('menuOpen')

const toggleNavigation = () => {
  menuOpen.value = !menuOpen.value
}

const prevScrollPos = ref(0)
const hasScrolled = ref(false)
const hasScrolledUp = ref(false)
const hasScrolledDown = ref(false)
const raf = ref<number | null>(null)

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

const handleMouseEnter = () => {
  if (coverVisible.value) {
    return
  }

  hasScrolledUp.value = true
  hasScrolledDown.value = false
}

onMounted(async () => {
  rAFHeaderScroll()
  window.addEventListener('scroll', rAFHeaderScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', rAFHeaderScroll)
  raf.value && cancelAnimationFrame(raf.value)
})

const isScreenMd = useAtMedia('(min-width: 800px)')

watchEffect(() => {
  if (import.meta.client && isScreenMd.value) {
    menuOpen.value = false
  }
})

const classesHeader = computed(() => [
  {
    'app-header--has-menu': menuOpen.value,
    'app-header--has-scrolled': hasScrolled.value && !menuOpen.value,
    'app-header--has-scrolled-up': hasScrolledUp.value && !menuOpen.value,
    'app-header--has-scrolled-down': coverVisible.value || (hasScrolledDown.value && !menuOpen.value),
    'transition-colors duration-300 ease-in-out delay-500': hasScrolled.value && hasScrolledDown.value,
  },
])
</script>

<template>
  <div
    :class="classesHeader"
    class="app-header h-[var(--app-header-height)]"
    @mouseenter="handleMouseEnter"
  >
    <div class="app-header__wrapper wrapper py-8 md:py-10 h-[inherit] max-md:flex max-md:items-center max-md:justify-center">
      <button
        type="button"
        class="absolute top-0 left-0 px-[var(--app-outer-gutter)] py-8 md:hidden active:opacity-70 transition-opacity duration-300 ease-out pointer-events-auto"
        @click="toggleNavigation"
      >
        <UiBurger />
      </button>

      <div class="absolute top-0 inset-x-0 w-full h-full flex items-center justify-center pointer-events-none">
        <NuxtLink
          to="/"
          class="
            block
            p-6
            -my-6
            pointer-events-auto
            transition-[opacity,color]
            duration-300
            ease-out
            hover:opacity-70
            md:absolute
          "
        >
          <IconLogo
            class="
              w-[174px]
              h-[13px]
              mx-auto
              lg:w-[232px]
              lg:h-[17px]
              md:relative
              md:left-[1.5%]
            "
          />
        </NuxtLink>
      </div>

      <AppHeaderMenu
        :studio-title="studioTitle"
        :studio="studio"
        :contact-title="contactTitle"
        :contact="contact"
      >
        <AppHeaderNavigation
          v-if="primaryNavigation"
          :items="primaryNavigation"
        />

        <AppHeaderNavigation
          v-if="secondaryNavigation"
          :items="secondaryNavigation"
        />
      </AppHeaderMenu>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.app-header {
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 150%;
    z-index: -1;
    transition: all 1s var(--ease-out);
    pointer-events: none;
  }

  &::before {
    --app-header-gradient-color: var(--color-rich-brown);

    background-image:
      linear-gradient(
        to bottom,
        --alpha(var(--app-header-gradient-color) / 100%) 0%,
        --alpha(var(--app-header-gradient-color) / 98.7%) 8.1%,
        --alpha(var(--app-header-gradient-color) / 95.1%) 15.5%,
        --alpha(var(--app-header-gradient-color) / 89.6%) 22.5%,
        --alpha(var(--app-header-gradient-color) / 82.5%) 29%,
        --alpha(var(--app-header-gradient-color) / 74.1%) 35.3%,
        --alpha(var(--app-header-gradient-color) / 64.8%) 41.2%,
        --alpha(var(--app-header-gradient-color) / 55%) 47.1%,
        --alpha(var(--app-header-gradient-color) / 45%) 52.9%,
        --alpha(var(--app-header-gradient-color) / 35.2%) 58.8%,
        --alpha(var(--app-header-gradient-color) / 25.9%) 64.7%,
        --alpha(var(--app-header-gradient-color) / 17.5%) 71%,
        --alpha(var(--app-header-gradient-color) / 10.4%) 77.5%,
        --alpha(var(--app-header-gradient-color) / 4.9%) 84.5%,
        --alpha(var(--app-header-gradient-color) / 1.3%) 91.9%,
        --alpha(var(--app-header-gradient-color) / 0%) 100%
      )
    ;
    opacity: 0;
  }

  &::after {
    --app-header-gradient-color: var(--color-offblack);

    background-image:
      linear-gradient(
        to bottom,
        --alpha(var(--app-header-gradient-color) / 100%) 0%,
        --alpha(var(--app-header-gradient-color) / 98.7%) 8.1%,
        --alpha(var(--app-header-gradient-color) / 95.1%) 15.5%,
        --alpha(var(--app-header-gradient-color) / 89.6%) 22.5%,
        --alpha(var(--app-header-gradient-color) / 82.5%) 29%,
        --alpha(var(--app-header-gradient-color) / 74.1%) 35.3%,
        --alpha(var(--app-header-gradient-color) / 64.8%) 41.2%,
        --alpha(var(--app-header-gradient-color) / 55%) 47.1%,
        --alpha(var(--app-header-gradient-color) / 45%) 52.9%,
        --alpha(var(--app-header-gradient-color) / 35.2%) 58.8%,
        --alpha(var(--app-header-gradient-color) / 25.9%) 64.7%,
        --alpha(var(--app-header-gradient-color) / 17.5%) 71%,
        --alpha(var(--app-header-gradient-color) / 10.4%) 77.5%,
        --alpha(var(--app-header-gradient-color) / 4.9%) 84.5%,
        --alpha(var(--app-header-gradient-color) / 1.3%) 91.9%,
        --alpha(var(--app-header-gradient-color) / 0%) 100%
      )
    ;
    opacity: 0.6;
  }

  &.app-header--has-scrolled::before,
  &.app-header--has-menu::before {
    opacity: 0.6;
  }

  &.app-header--has-scrolled:hover::before {
    opacity: 0.8;
    height: 300%;
  }

  &:not(.app-header--has-scrolled):hover::after {
    opacity: 0.8;
  }

  &.app-header--has-scrolled::after {
    opacity: 0;
  }

  &.app-header--has-scrolled-down::before {
    opacity: 0;
    transition: all 0.5s var(--ease-inOutQuart);
  }
}

.app-header__wrapper {
  opacity: 1;
  translate: 0 0 0;

  transition:
    translate 0s 0s,
    opacity 1s var(--ease-out),
    visibility 1s var(--ease-out);

  .app-header--has-scrolled-down & {
    opacity: 0;
    translate: 0 --spacing(-3) 0;

    transition:
      translate 0.5s var(--ease-inOutQuart),
      opacity 0.5s var(--ease-inOutQuart),
      visibility 0.5s var(--ease-inOutQuart);
  }
}
</style>

<style lang="postcss">
.app-header {
  color: var(--color-white);

  html:not(:has([class^="hero-"])) &:not(.app-header--has-menu, .app-header--has-scrolled) {
    color: var(--color-offblack);
  }

  html:not(:has([class^="hero-"])) &:not(.app-header--has-scrolled):hover::before {
    opacity: 0;
  }

  html:not(:has([class^="hero-"])) &:not(.app-header--has-scrolled)::after,
  html:not(:has([class^="hero-"])) &:not(.app-header--has-scrolled):hover::after {
    opacity: 0;
  }
}
</style>
