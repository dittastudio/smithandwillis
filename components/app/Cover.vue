<script lang="ts" setup>
import IconLogoMark from '@/assets/icons/logo-mark.svg'

const hasSeenCover = useState('hasSeenCover', () => false)

// const cover = ref<HTMLDivElement>()
// const coverVisible = ref(true)
// const logoVisible = ref(false)

onMounted(async () => {
  // await wait(1000)

  // logoVisible.value = true
  const hero = document.querySelector('[data-js-hero]') as HTMLDivElement
  const cover = document.querySelector('[data-js-cover]') as HTMLDivElement

  if (hero && cover && window.scrollY < 5 && !hasSeenCover.value) {
    document.documentElement.classList.remove('has-no-hero-animation')

    const header = document.querySelector('[data-js-header]') as HTMLDivElement

    await wait(500)

    hero.style.opacity = '1'
    cover.style.opacity = '1'

    await wait(2000)

    cover.style.opacity = '0'

    await wait(500)

    header.style.opacity = '1'
    header.style.translate = '0 0 0'

    hero.style.scale = '1'

    hasSeenCover.value = true
  }
  else {
    document.documentElement.classList.add('has-no-hero-animation')
    hasSeenCover.value = true
  }
})
</script>

<template>
  <div
    data-js-cover
    data-js-cover-animation="true"
    class="app-cover fixed inset-0 z-50 h-dvh text-white"
  >
    <div class="wrapper flex items-center justify-center h-full">
      <IconLogoMark
        class="app-cover__logo"
      />
    </div>
  </div>
</template>

<style>
@reference "../../assets/css/main.css";

.app-cover {
  /* background: radial-gradient(circle at center, transparent 0%, --alpha(var(--color-black) / 100%) 50%); */
  opacity: 0;
  pointer-events: none;
  /* background-color: black; */
  transition: opacity 1s var(--ease-in-out);

  &:has(html.is-storyblok-editor) {
    display: none;
  }

  /* &.is-active {
    pointer-events: auto;

    html:has(&) {
      overflow: hidden;
    }
  } */

  /* &,
  &__logo {
    opacity: 0;
    transition: opacity 1s var(--ease-in-out);

    &.is-active {
      opacity: 1;
    }
  } */

  &__logo {
    --logo-responsive-width: 9.75vw;

    width: 9.75vw;
    max-width: 140px;
    height: auto;
  }
}

html:has([data-js-cover-animation="true"]):not(.has-no-hero-animation) {
  [data-js-header] {
    opacity: 0;
    translate: 0 -20% 0;
    transition: opacity 1s var(--ease-in-out), translate 1s var(--ease-in-out);
  }

  [data-js-hero] {
    opacity: 0;
    scale: 1.05;
    transition: opacity 3s var(--ease-in-out), scale 1s var(--ease-in-out);
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
