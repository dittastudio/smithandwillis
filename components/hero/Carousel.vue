<script lang="ts" setup>
import type { HeroCarouselStoryblok } from '@/types/storyblok'

interface Props {
  block: HeroCarouselStoryblok
}

const { block } = defineProps<Props>()

const ratios = {
  mobile: {
    x: 10,
    y: 16,
  },
  desktop: {
    x: 16,
    y: 9,
  },
}
</script>

<template>
  <div
    v-editable="block"
    data-js-hero
    class="hero-carousel bg-offblack text-white h-svh overflow-hidden"
  >
    <UiScrollDown>
      <UiCarouselFade
        :options="{
          autoplay: 3000,
          navigation: true,
          slideClasses: 'h-svh',
        }"
        :slides="block.images || []"
        :ratio-x="ratios.mobile.x"
        :ratio-y="ratios.mobile.y"
        :ratio-desktop-x="ratios.desktop.x"
        :ratio-desktop-y="ratios.desktop.y"
      >
        <template #slide="{ slide, index }">
          <MediaImageResponsive
            :lazy="index !== 0"
            breakpoint="landscape"
            :asset="slide"
            :desktop-asset="slide"
            :ratio="`${ratios.mobile.x}:${ratios.mobile.y}`"
            :desktop-ratio="`${ratios.desktop.x}:${ratios.desktop.y}`"
            sizes="100vw sm:100vw md:100vw"
            desktop-sizes="md:100vw lg:100vw xl:100vw 2xl:100vw"
          />
        </template>
      </UiCarouselFade>
    </UiScrollDown>
  </div>
</template>
