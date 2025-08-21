<script lang="ts" setup>
import type {
  BlockCareers,
  BlockCarousel,
  BlockImage,
  BlockSplit,
  BlockText,
  BlockVideo,
  Page,
} from '@@/.storyblok/types/332344/storyblok-components'
import type { Colours } from '@/utils/maps'

interface Props {
  content: Page
}

type Blocks = BlockCareers
  | BlockCarousel
  | BlockImage
  | BlockSplit
  | BlockText
  | BlockVideo

const { content } = defineProps<Props>()

const hasColourProperties = (block: Blocks): block is BlockSplit | BlockText => ['block_text', 'block_split'].includes(block.component)

const checkBackgroundMatchesPrevBackground = (index: number) => {
  const current = content?.blocks?.[index]
  const previous = content?.blocks?.[index - 1]

  if (
    (!current || !previous)
    || (!hasColourProperties(current) || !hasColourProperties(previous))) {
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
  <div class="-mt-[var(--app-header-height)]">
    <section
      v-if="content.hero?.length"
      data-component="hero"
      class="relative overflow-hidden"
    >
      <HeroCover class="absolute inset-0 z-100" />

      <template
        v-for="hero in content.hero"
        :key="hero._uid"
      >
        <HeroImage
          v-if="hero.component === 'hero_image'"
          :block="hero"
        />

        <HeroCarousel
          v-else-if="hero.component === 'hero_carousel'"
          :block="hero"
        />
      </template>
    </section>

    <section
      v-for="(block, index) in content.blocks"
      :id="block.anchor_id ? safeKebabCase(block.anchor_id) : null"
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

      <BlockImage
        v-else-if="block.component === 'block_image'"
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

      <BlockVideo
        v-else-if="block.component === 'block_video'"
        :block="block"
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
