<script lang="ts" setup>
import type { BlockCarouselStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockCarouselStoryblok
}

const { block } = defineProps<Props>()

const ratios = {
  x: 10,
  y: 16,
}
</script>

<template>
  <div
    v-editable="block"
    class="block-carousel"
  >
    <UiCarouselFade
      :slides="block.slides || []"
      :caption="block.title"
      :ratio-x="ratios.x"
      :ratio-y="ratios.y"
      :ratio-desktop-x="ratios.y"
      :ratio-desktop-y="ratios.x"
    >
      <template #slide="{ slide }">
        <template v-if="slide.component === 'slide_image'">
          <SlideImages
            :items="slide.images"
            :ratio-x="ratios.x"
            :ratio-y="ratios.y"
            :ratio-desktop-x="ratios.y"
            :ratio-desktop-y="ratios.x"
          />
        </template>

        <template v-if="slide.component === 'slide_split'">
          <SlideSplit
            :media="slide.media"
            :ratio="`${ratios.x / 2}:${ratios.y}`"
            :headline="slide.headline"
            :text="slide.text"
            :reverse="slide.reverse"
            :text-color="slide.text_color"
            :background-color="slide.background_color"
          />
        </template>
      </template>
    </UiCarouselFade>
  </div>
</template>
