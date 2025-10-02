<script lang="ts" setup>
import type { BlockVideo } from '@@/.storyblok/types/332344/storyblok-components'

interface Props {
  block: BlockVideo
}

const { block } = defineProps<Props>()

const poster = storyblokImage(block.poster?.filename, {
  width: 1600,
  quality: 70,
})

const ratio = computed(() => block.video_desktop?.filename && block.ratio_desktop
  ? `${ratios[block.ratio_mobile]} ${ratios[`md-${block.ratio_desktop}`]}`
  : `${ratios[block.ratio_mobile]}`,
)
</script>

<template>
  <div v-editable="block">
    <MediaVideo
      v-if="block.video_mobile?.filename"
      :class="[
        { 'md:hidden': block.video_desktop?.filename },
        ratio,
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
        ratio,
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
