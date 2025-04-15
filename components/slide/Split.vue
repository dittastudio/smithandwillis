<script lang="ts" setup>
import type { RichtextStoryblok } from '@/types/storyblok'
import type { Colours } from '@/utils/maps'

interface Props {
  textColor?: Colours
  backgroundColor?: Colours
  media: any
  ratio: string
  desktopRatio: string
  headline: string
  text: RichtextStoryblok
  reverse?: boolean
  alignmentMobile?: 'top' | 'bottom'
}

const { media, ratio, headline, text, reverse = false, textColor, backgroundColor, alignmentMobile = 'bottom' } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(media?.filename || ''))
</script>

<template>
  <div
    class="relative flex flex-col-reverse items-center h-full"
    :class="[
      reverse ? 'md:flex-row-reverse' : 'md:flex-row',
      textColor ? colourText[textColor] : 'text-offblack',
      backgroundColor ? colourBackground[backgroundColor] : 'bg-warm-grey',
      'max-md:text-current max-md:bg-transparent',
    ]"
  >
    <div class="w-full h-[inherit] md:w-1/2">
      <MediaImageResponsive
        v-if="media && assetType === 'image'"
        :asset="media"
        :ratio="ratio"
        :desktop-ratio="desktopRatio"
        sizes="100vw sm:100vw md:50vw lg:50vw"
        desktop-sizes="md:100vw lg:100vw xl:100vw 2xl:100vw"
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
        max-w-[900px]
      "
      :class="[
        alignmentMobile === 'top' && 'max-md:justify-start',
        alignmentMobile === 'bottom' && 'max-md:justify-end',
      ]"
    >
      <div
        class="
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
          !reverse && 'md:pl-[calc(var(--app-outer-gutter)_+_--spacing(4))]',
          alignmentMobile === 'top' && 'max-md:pt-[calc(var(--app-outer-gutter)_*_2)] max-md:bg-gradient-to-t from-transparent from-0% to-black/80 to-100%',
          alignmentMobile === 'bottom' && 'max-md:pb-[calc(var(--app-outer-gutter)_*_4)] max-md:bg-gradient-to-b from-transparent from-0% to-black/80 to-100%',
        ]"
      >
        <h3
          v-if="headline"
          class="type-sans-large-caps text-balance"
        >
          {{ headline }}
        </h3>

        <div
          v-if="storyblokRichTextContent(text)"
          class="prose-body"
        >
          <StoryblokText :html="text" />
        </div>
      </div>
    </div>
  </div>
</template>
