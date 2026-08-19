<script lang="ts" setup>
import type {
  BlockCareers,
  BlockCarousel,
  BlockHero,
  BlockMediaGrid,
  BlockSplit,
  BlockText,
  Page,
} from '#storyblok-components'
import type { Colours } from '@/utils/maps'
import { backgroundTheme } from '@/utils/maps'

interface Props {
  content: Page
}

type Blocks = BlockCareers
  | BlockCarousel
  | BlockHero
  | BlockMediaGrid
  | BlockSplit
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

const getHeaderColor = (block: Blocks): 'light' | 'dark' => {
  if ('header_color' in block && block.header_color) {
    return block.header_color as 'light' | 'dark'
  }

  if ('background_color' in block) {
    return backgroundTheme[block.background_color as Colours || 'warmgrey']
  }
  return 'light'
}
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
      ]"
      :theme="getHeaderColor(block)"
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
  padding-block: --spacing(30);

  @variant md {
    padding-block: --spacing(40);
  }
}

.content-blocks__item--block_media_grid + .content-blocks__item--block_media_grid {
  padding-block-start: --spacing(1);
}

/* .content-blocks__item:not([class*="bg-"]) + .content-blocks__item.bg-offblack,
.content-blocks__item.bg-offblack + .content-blocks__item:not([class*="bg-"]),
.content-blocks__item--same-background {
  padding-block-start: 0;
} */
</style>
