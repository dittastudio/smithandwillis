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
    class="block-carousel"
  >
    <UiCarouselFade
      :slides="block.slides || []"
      :caption="block.title"
      :ratio-x="ratios.mobile.x"
      :ratio-y="ratios.mobile.y"
      :ratio-desktop-x="ratios.desktop.x"
      :ratio-desktop-y="ratios.desktop.y"
    >
      <template #slide="{ slide }">
        <template v-if="slide.component === 'slide_image'">
          <SlideImages
            :items="slide.images"
            :ratio-x="ratios.mobile.x"
            :ratio-y="ratios.mobile.y"
            :ratio-desktop-x="ratios.desktop.x"
            :ratio-desktop-y="ratios.desktop.y"
          />
        </template>
      </template>
    </UiCarouselFade>
  </div>
</template>
