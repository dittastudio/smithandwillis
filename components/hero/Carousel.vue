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
    class="hero-carousel bg-offblack text-white h-svh"
  >
    <UiScrollDown>
      <UiParallax>
        <UiCarouselFade
          :options="{
            autoplay: block.autoplay,
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
          <!-- <template #slide="{ slide, index }">
            <MediaImageResponsive
              :lazy="index !== 0"
              breakpoint="landscape"
              :asset="slide"
              :desktop-asset="slide"
              :ratio="`${ratios.mobile.x}:${ratios.mobile.y}`"
              :desktop-ratio="`${ratios.desktop.x}:${ratios.desktop.y}`"
              sizes="
                2xs:100vw
                xs:100vw
                sm:100vw
                md:100vw
              "
              desktop-sizes="
                md:100vw
                lg:100vw
                xl:100vw
                2xl:100vw
              "
            />
          </template> -->
        </UiCarouselFade>
      </UiParallax>
    </UiScrollDown>
  </div>
</template>
