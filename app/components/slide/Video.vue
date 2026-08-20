<script lang="ts" setup>
import type { SlideVideo } from '#storyblok-components'

interface Props {
  block: SlideVideo
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
        'size-full object-cover',
        { 'md:hidden': block.video_desktop?.filename },
      ]"
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
        'size-full object-cover',
        { 'hidden md:block': block.video_mobile?.filename },
      ]"
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
