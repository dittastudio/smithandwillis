<script lang="ts" setup>
import type { HeroImage } from '@@/.storyblok/types/332344/storyblok-components'

interface Props {
  block: HeroImage
}

const { block } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="block"
    class="relative h-svh bg-offblack text-white"
  >
    <HeroScrollDown>
      <UiParallax>
        <MediaImageResponsive
          v-if="block.media && assetType === 'image'"
          :lazy-placeholder="false"
          breakpoint="landscape"
          :asset="block.media"
          :desktop-asset="block.media"
          ratio="10:16"
          desktop-ratio="16:9"
          sizes="
            2xs:100vw
            xs:100vw
            sm:100vw
            md:100vw
          "
          desktop-sizes="
            md:100vw
            lg:100vw
            xl:100vw
            2xl:100vw
          "
        />
      </UiParallax>
    </HeroScrollDown>
  </div>
</template>
