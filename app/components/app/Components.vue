<script lang="ts" setup>
import type {
  BlockCareers,
  BlockCarousel,
  BlockMediaGrid,
  BlockSplit,
  BlockText,
  Page,
} from '#storyblok-components'
import type { Colours } from '@/utils/maps'

interface Props {
  content: Page
}

type Blocks = BlockCareers
  | BlockCarousel
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
</script>

<template>
  <div class="-mt-(--app-header-height)">
    <section
      v-if="content.hero?.length"
      data-component="hero"
    >
      <template
        v-for="hero in content.hero"
        :key="hero._uid"
      >
        <Hero
          v-if="hero.component === 'hero'"
          :block="hero"
        />
      </template>
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
        :block="block"
      />

      <BlockCarousel
        v-else-if="block.component === 'block_carousel'"
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
    </section>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.content-blocks__item:not(
  .content-blocks__item--block_media_grid,
  .content-blocks__item--block_split,
  .content-blocks__item--block_carousel
) {
  padding-block: --spacing(30);

  @variant md {
    padding-block: --spacing(40);
  }
}

.content-blocks__item:not([class*="bg-"]) + .content-blocks__item.bg-offblack,
.content-blocks__item.bg-offblack + .content-blocks__item:not([class*="bg-"]),
.content-blocks__item--same-background {
  padding-block-start: 0;
}
</style>
