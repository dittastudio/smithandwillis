<script lang="ts" setup>
import type { BlockMediaStoryblok } from '@/types/storyblok'
import { storyblokAssetType } from '@/utils/storyblok'

interface Props {
  block: BlockMediaStoryblok
}

const { block } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="block"
    class="block-media"
  >
    <MediaImage
      v-if="block.media && assetType === 'image'"
      class="block-media__media"
      :asset="block.media"
      :ratio="block.ratio"
      sizes="
        100vw
        sm:100vw
        md:100vw
        lg:100vw
        xl:100vw
      "
    />
  </div>
</template>

<style lang="postcss" scoped>
.block-media {

}
</style>
