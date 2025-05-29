<script lang="ts" setup>
import type { SlideSplitStoryblok } from '@@/types/storyblok'
import type { Colours } from '@/utils/maps'

interface Props {
  block: SlideSplitStoryblok
  ratio: string
  desktopRatio: string
}

const { block, ratio, desktopRatio } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <div
    class="relative flex flex-col-reverse items-center h-full"
    :class="[
      block.reverse ? 'md:flex-row-reverse' : 'md:flex-row',
      block.text_color ? colourText[block.text_color as Colours] : 'text-offblack',
      block.background_color ? colourBackground[block.background_color as Colours] : 'bg-warm-grey',
      'max-md:text-current max-md:bg-transparent',
    ]"
  >
    <div class="w-full h-[inherit] md:w-1/2">
      <MediaImageResponsive
        v-if="block.media && assetType === 'image'"
        :asset="block.media"
        :desktop-asset="block.media"
        :ratio="ratio"
        :desktop-ratio="desktopRatio"
        sizes="
          2xs:100vw
          xs:100vw
          sm:100vw
          md:100vw
        "
        desktop-sizes="
          md:50vw
          lg:50vw
          xl:50vw
          2xl:50vw
        "
      />
    </div>

    <div
      class="
        absolute
        inset-0
        md:static
        flex
        flex-col
        items-start
        w-full
        md:w-1/2
        2xl:w-auto
        2xl:mx-auto
      "
      :class="[
        block.alignment_mobile === 'top' && 'max-md:justify-start',
        block.alignment_mobile === 'bottom' && 'max-md:justify-end',
      ]"
    >
      <div
        class="
          slide-split__content
          flex
          flex-col
          items-start
          gap-8
          md:gap-10
          p-[var(--app-outer-gutter)]
          md:py-[calc(var(--app-outer-gutter)_*_3)]
          w-full
        "
        :class="[
          !block.reverse && 'md:pl-[calc(var(--app-outer-gutter)_+_--spacing(4))] 2xl:pr-[calc(var(--app-outer-gutter)_+_--spacing(4))]',
          block.alignment_mobile === 'top' && 'slide-split__content--top max-md:pt-[calc(var(--app-outer-gutter)_*_2)]',
          block.alignment_mobile === 'bottom' && 'slide-split__content--bottom max-md:pb-[calc(var(--app-outer-gutter)_*_4)]',
        ]"
      >
        <h3
          v-if="block.headline"
          class="type-sans-large-caps text-balance"
        >
          {{ block.headline }}
        </h3>

        <div
          v-if="storyblokRichTextContent(block.text)"
          class="prose"
        >
          <StoryblokText :html="block.text" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

@variant max-md {
  .slide-split__content {
    position: relative;
    z-index: 0;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      z-index: -1;
      opacity: 0.6;
      width: 100%;
      height: 150%;
    }
  }

  .slide-split__content--top {
    &:before {
      top: 0;
      background-image: linear-gradient(to top, transparent, var(--color-black) 50%);
    }
  }

  .slide-split__content--bottom {
    &:before {
      bottom: 0;
      background-image: linear-gradient(to bottom, transparent, var(--color-black) 50%);
    }
  }
}
</style>
