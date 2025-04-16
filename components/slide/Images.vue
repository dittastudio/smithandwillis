<script lang="ts" setup>
import type { SlideImagesStoryblok } from '@/types/storyblok'

interface Props {
  block: SlideImagesStoryblok
  ratioX?: number
  ratioY?: number
  ratioDesktopX?: number
  ratioDesktopY?: number
}

const { block, ratioX = 10, ratioY = 16, ratioDesktopX = 16, ratioDesktopY = 9 } = defineProps<Props>()
</script>

<template>
  <div class="relative flex flex-col md:flex-row h-full">
    <template
      v-for="image in block.images"
      :key="image.id"
    >
      <MediaImageResponsive
        v-if="storyblokAssetType(image?.filename || '') === 'image'"
        :asset="image"
        :desktop-asset="image"
        :ratio="`${ratioX}:${Math.round(ratioY / (block.images?.length || 1))}`"
        :desktop-ratio="`${Math.round(ratioDesktopX / (block.images?.length || 1))}:${ratioDesktopY}`"
        sizes="
          2xs:100vw
          xs:100vw
          sm:100vw
          md:100vw
        "
        :desktop-sizes="`
          md:${Math.round(100 / (block.images?.length || 1))}vw
          lg:${Math.round(100 / (block.images?.length || 1))}vw
          xl:${Math.round(100 / (block.images?.length || 1))}vw
          2xl:${Math.round(100 / (block.images?.length || 1))}vw
        `"
      />
    </template>
  </div>
</template>
