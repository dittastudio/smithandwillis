<script lang="ts" setup>
import type {
  BlockCareersStoryblok,
  BlockCarouselStoryblok,
  BlockImageStoryblok,
  BlockSplitStoryblok,
  BlockTextStoryblok,
  BlockVideoStoryblok,
  PageStoryblok,
} from '@/types/storyblok'
import type { Colours } from '@/utils/maps'

interface Props {
  content: PageStoryblok
}

type Blocks = BlockCareersStoryblok
  | BlockCarouselStoryblok
  | BlockImageStoryblok
  | BlockSplitStoryblok
  | BlockTextStoryblok
  | BlockVideoStoryblok

const { content } = defineProps<Props>()
const coverVisible = useState<boolean>('coverVisible')

const checkBackgroundMatchesPrevBackground = (index: number) => {
  const current = content?.blocks?.[index]
  const previous = content?.blocks?.[index - 1]

  return (index !== 0 && current && previous) ? current.background_color === previous.background_color : false
}

const hasColourProperties = (block: Blocks): block is BlockSplitStoryblok | BlockTextStoryblok => ['block_text', 'block_split'].includes(block.component)

const setColourProperties = (block: Blocks, index: number) => hasColourProperties(block)
  ? [
      colourText[block.text_color as Colours || 'offblack'],
      colourBackground[block.background_color as Colours || 'warmgrey'],
      checkBackgroundMatchesPrevBackground(index) ? 'content-blocks__item--same-background' : '',
    ]
  : []
</script>

<template>
  <div class="-mt-[var(--app-header-height)]">
    <section
      v-for="hero in content.hero"
      :key="hero._uid"
      class="overflow-hidden"
    >
      <div
        class="w-full h-svh transition-transform duration-1500 ease-in-out"
        :class="{
          'scale-120': coverVisible,
        }"
      >
        <HeroImage
          v-if="hero.component === 'hero_image'"
          :block="hero"
        />

        <HeroCarousel
          v-if="hero.component === 'hero_carousel'"
          :block="hero"
        />
      </div>
    </section>

    <section
      v-for="(block, index) in content.blocks"
      :key="block._uid"
      class="content-blocks__item"
      :class="[
        `content-blocks__item--${block.component}`,
        ...setColourProperties(block, index),
      ]"
    >
      <BlockCareers
        v-if="block.component === 'block_careers'"
        :block
      />

      <BlockCarousel
        v-else-if="block.component === 'block_carousel'"
        :block
      />

      <BlockImage
        v-else-if="block.component === 'block_image'"
        :block
      />

      <BlockSplit
        v-else-if="block.component === 'block_split'"
        :block
      />

      <BlockText
        v-else-if="block.component === 'block_text'"
        :block
      />

      <BlockVideo
        v-else-if="block.component === 'block_video'"
        :block
      />

      <!-- <Screen :log="block" /> -->
    </section>
  </div>
</template>

<style lang="postcss" scoped>
.content-blocks__item:not(
  .content-blocks__item--block_image,
  .content-blocks__item--block_video,
  .content-blocks__item--block_split,
  .content-blocks__item--block_carousel
) {
  padding-block: 160px;
}

.content-blocks__item:not([class*="bg-"]) + .content-blocks__item.bg-offblack,
.content-blocks__item.bg-offblack + .content-blocks__item:not([class*="bg-"]),
.content-blocks__item--same-background {
  padding-block-start: 0;
}
</style>
