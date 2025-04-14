<script lang="ts" setup>
import type { HeroImageStoryblok } from '@/types/storyblok'

interface Props {
  block: HeroImageStoryblok
}

const { block } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="block"
    class="relative overflow-hidden h-svh bg-offblack text-white"
  >
    <UiScrollDown>
      <MediaImageResponsive
        v-if="block.media && assetType === 'image'"
        breakpoint="landscape"
        :asset="block.media"
        :desktop-asset="block.media"
        ratio="10:16"
        desktop-ratio="16:9"
        sizes="100vw sm:100vw md:100vw"
        desktop-sizes="md:100vw lg:100vw xl:100vw 2xl:100vw"
      />
    </UiScrollDown>
  </div>
</template>
