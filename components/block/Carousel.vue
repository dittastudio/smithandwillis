<script lang="ts" setup>
import type { BlockCarouselStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockCarouselStoryblok
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
    class="block-carousel bg-offblack text-white"
  >
    <UiCarouselFade
      :options="{
        autoplay: block.autoplay,
        navigation: true,
      }"
      :slides="block.slides || []"
      :ratio-x="ratios.mobile.x"
      :ratio-y="ratios.mobile.y"
      :ratio-desktop-x="ratios.desktop.x"
      :ratio-desktop-y="ratios.desktop.y"
    >
      <template #slide="{ slide }">
        <template v-if="slide.component === 'slide_media'">
          <SlideMedia
            :items="slide.media"
            :ratio-x="ratios.mobile.x"
            :ratio-y="ratios.mobile.y"
            :ratio-desktop-x="ratios.desktop.x"
            :ratio-desktop-y="ratios.desktop.y"
          />
        </template>

        <template v-if="slide.component === 'slide_split'">
          <SlideSplit
            :media="slide.media"
            :ratio="`${ratios.mobile.x}:${ratios.mobile.y}`"
            :desktop-ratio="`${ratios.desktop.x / 2}:${ratios.desktop.y}`"
            :headline="slide.headline"
            :text="slide.text"
            :reverse="slide.reverse"
            :text-color="slide.text_color"
            :background-color="slide.background_color"
            :alignment-mobile="slide.alignment_mobile"
          />
        </template>
      </template>

      <template #caption>
        <template v-if="block.link">
          <StoryblokLink
            :item="block.link"
            class="block p-3 -m-3 transition-opacity duration-300 ease-out hover:opacity-70"
          >
            {{ block.title }}
          </StoryblokLink>
        </template>

        <template v-else>
          {{ block.title }}
        </template>
      </template>
    </UiCarouselFade>
  </div>
</template>
