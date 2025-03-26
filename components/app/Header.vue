<script setup lang="ts">
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

const classesNavList = 'flex items-center md:gap-8 lg:gap-12 font-mix text-15 leading-5.5 tracking-lg uppercase md:text-13 lg:text-14 md:leading-6'
const classesNavLink = 'block md:p-4 md:-m-4 lg:p-6 lg:-m-6 transition-opacity duration-300 ease-out hover:opacity-70'

const classesHeader = computed<Record<string, boolean>>(() => ({
  'header--is-open': menuOpen.value,
  'header--has-scrolled': hasScrolled.value,
  'header--has-scrolled-up': hasScrolledUp.value,
  'header--has-scrolled-down': hasScrolledDown.value,
}))
</script>

<template>
  <header
    :class="classesHeader"
    class="header sticky top-0 z-10 text-white"
  >
    <div class="header__wrapper wrapper py-8 md:py-10">
      <div class="md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
        <button
          type="button"
          class="absolute top-0 left-0 p-8 md:hidden active:opacity-70 transition-opacity duration-300 ease-out"
          @click="toggleMenu"
        >
          <UiBurger :is-open="menuOpen" />
        </button>

        <nav
          :class="[
            'max-md:absolute max-md:top-0 max-md:left-0 max-md:right-0 max-md:min-h-screen max-md:-z-1',
            'max-md:bg-rich-brown max-md:text-white',
            'max-md:hidden',
          ]"
        >
          <ul :class="classesNavList">
            <li>
              <a
                :class="classesNavLink"
                href="/"
              >
                Places
              </a>
            </li>

            <li>
              <a
                :class="classesNavLink"
                href="/"
              >
                People
              </a>
            </li>

            <li>
              <a
                :class="classesNavLink"
                href="/"
              >
                Studio
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <a
            class="block p-6 -my-6"
            href="/"
          >
            <SvgIcon
              name="logo"
              class="text-orange w-[174px] h-[13px] mx-auto lg:w-[232px] lg:h-[17px]"
            />
          </a>
        </div>

        <nav class="max-md:hidden">
          <ul
            :class="classesNavList"
            class="justify-end"
          >
            <li>
              <a
                :class="classesNavLink"
                href="/"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<style>
@reference "../../assets/css/main.css";

.header {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to top,
      --alpha(var(--color-warm-grey) / 0%),
      --alpha(var(--color-warm-grey) / 100%)
    );
    z-index: -1;
  }
}

.header__wrapper {
  pointer-events: auto;
  opacity: 1;
  translate: 0 0 0;

  transition:
    translate 0s 0s,
    opacity 1s var(--ease-out);

  .header--has-scrolled-down & {
    pointer-events: none;
    opacity: 0;
    translate: 0 --spacing(-5) 0;

    transition:
      translate 0.5s var(--ease-in-out),
      opacity 0.5s var(--ease-in-out);
  }
}
</style>
