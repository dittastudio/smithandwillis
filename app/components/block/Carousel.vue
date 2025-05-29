<script lang="ts" setup>
import type { BlockCarouselStoryblok } from '@@/types/storyblok'

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
    class="bg-offblack text-white"
  >
    <UiCarouselFade
      :options="{
        autoplay: false,
        navigation: true,
        pagination: true,
      }"
      :slides="block.slides || []"
      :ratio-x="ratios.mobile.x"
      :ratio-y="ratios.mobile.y"
      :ratio-desktop-x="ratios.desktop.x"
      :ratio-desktop-y="ratios.desktop.y"
    >
      <template #slide="{ slide }">
        <template v-if="slide.component === 'slide_images'">
          <SlideImages
            :block="slide"
            :ratio-x="ratios.mobile.x"
            :ratio-y="ratios.mobile.y"
            :ratio-desktop-x="ratios.desktop.x"
            :ratio-desktop-y="ratios.desktop.y"
          />
        </template>

        <template v-else-if="slide.component === 'slide_video'">
          <SlideVideo :block="slide" />
        </template>

        <template v-else-if="slide.component === 'slide_split'">
          <SlideSplit
            :block="slide"
            :ratio="`${ratios.mobile.x}:${ratios.mobile.y}`"
            :desktop-ratio="`${ratios.desktop.x / 2}:${ratios.desktop.y}`"
          />
        </template>
      </template>

      <template
        v-if="block.title"
        #caption
      >
        <template v-if="block.link?.cached_url">
          <StoryblokLink
            :item="block.link"
            class="block p-3 -m-3 transition-opacity duration-300 ease-out hover:opacity-70"
          >
            <UiTextLink :is-external="block.link.linktype === 'url'">
              {{ block.title }}
            </UiTextLink>
          </StoryblokLink>
        </template>

        <template v-else>
          {{ block.title }}
        </template>
      </template>
    </UiCarouselFade>
  </div>
</template>
