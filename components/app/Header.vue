<script setup lang="ts">
import type { LinkStoryblok } from '@/types/storyblok'
import IconLogo from '@/assets/icons/logo.svg'

interface Props {
  primaryNavigation: LinkStoryblok[]
  secondaryNavigation: LinkStoryblok[]
}

const { primaryNavigation, secondaryNavigation } = defineProps<Props>()

const menuOpen = useState<boolean>('menuOpen')

const toggleNavigation = () => {
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
    class="app-header text-white max-md:h-[var(--header-height)]"
  >
    <div class="app-header__wrapper wrapper py-8 md:py-10 h-[inherit] max-md:flex max-md:items-center max-md:justify-center">
      <div class="">
        <button
          type="button"
          class="absolute top-0 left-0 px-[var(--app-outer-gutter)] py-8 md:hidden active:opacity-70 transition-opacity duration-300 ease-out pointer-events-auto"
          @click="toggleNavigation"
        >
          <UiBurger :is-open="menuOpen" />
        </button>

        <NuxtLink
          class="
            block
            p-6
            -my-6
            pointer-events-auto
            transition-colors
            ease-out
            hover:text-orange
            md:absolute
          "
          :class="[
            hasScrolled ? 'text-white' : 'text-orange',
            hasScrolledDown && 'delay-500',
            hasScrolledUp ? 'duration-300 delay-0' : 'duration-500',
          ]"
          to="/"
        >
          <IconLogo
            class="
              w-[174px]
              h-[13px]
              mx-auto
              lg:w-[232px]
              lg:h-[17px]
            "
          />

          <span class="sr-only">Smith & Willis</span>
        </NuxtLink>

        <AppHeaderMenu>
          <AppHeaderNavigation
            :items="primaryNavigation"
          />

          <AppHeaderNavigation
            :items="secondaryNavigation"
          />
        </AppHeaderMenu>
      </div>
    </div>
  </header>
</template>

<style>
@reference "../../assets/css/main.css";

.app-header {
  &::before {
    --app-header-gradient-color: var(--color-rich-brown);

    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 150%;
    opacity: 0;
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
    z-index: -1;
    transition: opacity 1s var(--ease-out);
  }

  &.app-header--has-scrolled {
    &::before {
      opacity: 0.6;
    }
  }

  &.app-header--has-scrolled-down {
    &::before {
      opacity: 0;
      transition: opacity 0.5s var(--ease-inOutQuart);
    }
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
    translate: 0 --spacing(-3) 0;

    transition:
      translate 0.5s var(--ease-inOutQuart),
      opacity 0.5s var(--ease-inOutQuart);
  }
}
</style>
