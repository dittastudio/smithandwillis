<script lang="ts" setup>
// import type { BlockMediaStoryblok } from '@/types/storyblok'
import { storyblokAssetType } from '@/utils/storyblok'

interface Props {
  content: any
}

const { content } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(content.media?.filename || ''))
</script>

<template>
  <div
    v-editable="content"
    class="hero-main h-screen"
  >
    <MediaImageResponsive
      v-if="content.media && assetType === 'image'"
      :cover="true"
      breakpoint="landscape"
      :asset="content.media"
      :desktop-asset="content.media"
      :ratio="content.ratio"
      :desktop-ratio="content.ratio_desktop"
      sizes="100vw sm:100vw md:100vw"
      desktop-sizes="md:100vw lg:100vw xl:100vw 2xl:100vw"
    />
  </div>
</template>
