<script lang="ts" setup>
import type { HeroMediaStoryblok } from '@/types/storyblok'
import IconArrowLarge from '@/assets/icons/arrow-large.svg'

interface Props {
  block: HeroMediaStoryblok
}

const { block } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="block"
    class="relative overflow-hidden h-svh"
  >
    <MediaImageResponsive
      v-if="block.media && assetType === 'image'"
      breakpoint="landscape"
      :asset="block.media"
      :desktop-asset="block.media"
      :ratio="block.ratio"
      :desktop-ratio="block.ratio_desktop"
      sizes="100vw sm:100vw md:100vw"
      desktop-sizes="md:100vw lg:100vw xl:100vw 2xl:100vw"
    />

    <div
      class="
        block-hero__scroll
        absolute
        bottom-0
        left-0
        right-0
        z-1
        before:absolute
        before:bottom-0
        before:left-0
        before:right-0
        before:-z-1
        before:w-full
        before:h-[200%]
        before:mx-auto
      "
    >
      <button
        type="button"
        class="
          block
          size-full
          py-10
          text-white
          transition-opacity
          duration-300
          ease-out
          hover:opacity-70
        "
        @click="scrollToWithEasing('hero-scroll-target', 1000)"
      >
        <IconArrowLarge class="w-[16px] h-[18px] mx-auto animate-bounce" />

        <span class="sr-only">
          Scroll
        </span>
      </button>
    </div>
  </div>

  <div id="hero-scroll-target" />
</template>

<style>
@reference "../../assets/css/main.css";

.block-hero__scroll {
  &::before {
    opacity: 0.8;
    background-image: radial-gradient(ellipse at 50% 120%, --alpha(var(--color-black) / 100%) 0%, --alpha(var(--color-black) / 0%) 50%);
    transition: opacity 0.3s var(--ease-out);
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }
}
</style>
