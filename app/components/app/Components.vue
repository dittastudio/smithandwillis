<script lang="ts" setup>
import type {
  BlockCareers,
  BlockCarousel,
  BlockHero,
  BlockMediaGrid,
  BlockSplit,
  BlockStatement,
  BlockText,
  Page,
} from '#storyblok-components'
import type { Colours } from '@/utils/maps'

interface Props {
  content: Page
}

type Blocks = BlockCareers
  | BlockCarousel
  | BlockHero
  | BlockMediaGrid
  | BlockSplit
  | BlockStatement
  | BlockText

const { content } = defineProps<Props>()

const hasColourProperties = (block: Blocks): block is BlockSplit | BlockText | BlockCareers => ['block_text', 'block_split', 'block_careers'].includes(block.component)

const checkBackgroundMatchesPrevBackground = (index: number) => {
  const current = content?.blocks?.[index]
  const previous = content?.blocks?.[index - 1]

  if (
    (!current || !previous)
    || (!hasColourProperties(current) || !hasColourProperties(previous))
  ) {
    return false
  }

  return (index !== 0 && current && previous) ? current.background_color === previous.background_color : false
}

const setColourProperties = (block: Blocks, index: number) => hasColourProperties(block)
  ? [
      colourText[block.text_color as Colours || 'offblack'],
      colourBackground[block.background_color as Colours || 'warmgrey'],
      checkBackgroundMatchesPrevBackground(index) ? 'content-blocks__item--same-background' : '',
    ]
  : []

const isSingleItemMediaGrid = (block: Blocks) => block.component === 'block_media_grid' && (block.items?.length ?? 0) === 1
</script>

<template>
  <div class="-mt-(--app-header-height)">
    <UiTheme
      v-for="(block, index) in content.blocks"
      :key="block._uid"
      tag="section"
      class="content-blocks__item"
      :class="[
        `content-blocks__item--${block.component}`,
        ...setColourProperties(block, index),
        isSingleItemMediaGrid(block) ? 'content-blocks__item--single-media-grid' : '',
      ]"
      :block="block"
    >
      <BlockCareers
        v-if="block.component === 'block_careers'"
        :block="block"
      />

      <BlockCarousel
        v-else-if="block.component === 'block_carousel'"
        :block="block"
      />

      <BlockHero
        v-else-if="block.component === 'block_hero'"
        :block="block"
      />

      <BlockMediaGrid
        v-else-if="block.component === 'block_media_grid'"
        :block="block"
      />

      <BlockSplit
        v-else-if="block.component === 'block_split'"
        :block="block"
      />

      <BlockText
        v-else-if="block.component === 'block_text'"
        :block="block"
      />

      <BlockStatement
        v-else-if="block.component === 'block_statement'"
        :block="block"
      />
    </UiTheme>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.content-blocks__item:not(
  .content-blocks__item--block_hero,
  .content-blocks__item--block_media_grid,
  .content-blocks__item--block_split,
  .content-blocks__item--block_carousel
) {
  padding-block: clamp(150px, 110.5263px + 10.5263vw, 300px);
}

.content-blocks__item--block_media_grid + .content-blocks__item--block_media_grid,
.content-blocks__item--block_media_grid + .content-blocks__item--block_carousel {
  padding-block-start: --spacing(1);
}

.content-blocks__item--single-media-grid + .content-blocks__item--single-media-grid {
  padding-block-start: 0;
}

.content-blocks__item.content-blocks__item--same-background {
  padding-block-start: 0;
}
</style>
