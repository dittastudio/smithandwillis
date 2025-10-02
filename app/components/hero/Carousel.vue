<script lang="ts" setup>
import type { HeroCarousel } from '@@/.storyblok/types/332344/storyblok-components'

interface Props {
  block: HeroCarousel
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
    class="bg-offblack text-white h-svh"
  >
    <HeroScrollDown>
      <UiParallax>
        <UiCarouselFade
          :options="{
            autoplay: block.autoplay,
            autoplayDuration: Number(block.autoplay_duration),
            navigation: true,
            pagination: false,
            slideClasses: 'h-svh',
          }"
          :slides="block.slides || []"
          :ratio-x="ratios.mobile.x"
          :ratio-y="ratios.mobile.y"
          :ratio-desktop-x="ratios.desktop.x"
          :ratio-desktop-y="ratios.desktop.y"
        >
          <template #slide="{ slide, index }">
            <template v-if="slide.component === 'slide_images'">
              <SlideImages
                :index="index"
                :block="slide"
                :ratio-x="ratios.mobile.x"
                :ratio-y="ratios.mobile.y"
                :ratio-desktop-x="ratios.desktop.x"
                :ratio-desktop-y="ratios.desktop.y"
              />
            </template>

            <template v-if="slide.component === 'slide_video'">
              <SlideVideo :block="slide" />
            </template>
          </template>
        </UiCarouselFade>
      </UiParallax>
    </HeroScrollDown>
  </div>
</template>
