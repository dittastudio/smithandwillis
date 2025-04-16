<script lang="ts" setup>
import type { SlideVideoStoryblok } from '@/types/storyblok'

interface Props {
  block: SlideVideoStoryblok
}

const { block } = defineProps<Props>()

const poster = storyblokImage(block.poster?.filename, {
  width: 1600,
  quality: 70,
})
</script>

<template>
  <div class="h-full">
    <MediaVideo
      v-if="block.video_mobile?.filename"
      :class="[
        { 'md:hidden': block.video_desktop?.filename },
      ]"
      class="w-full h-full object-cover"
      :sources="[
        { src: block.video_mobile.filename },
      ]"
      :poster
      playsinline
      autoplay
      muted
      loop
      lazy
    />

    <MediaVideo
      v-if="block.video_desktop?.filename"
      :class="[
        { 'hidden md:block': block.video_mobile?.filename },
      ]"
      class="w-full h-full object-cover"
      :sources="[
        { src: block.video_desktop.filename },
      ]"
      :poster
      playsinline
      autoplay
      muted
      loop
      lazy
    />
  </div>
</template>
