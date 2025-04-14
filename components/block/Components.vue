<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

interface Props {
  content: PageStoryblok
}

const { content } = defineProps<Props>()

const checkBackgroundMatchesPrevBackground = (index: number) => {
  if (index === 0)
    return false
  else
    return content?.blocks?.[index].background_color === content.blocks?.[index - 1].background_color
}
</script>

<template>
  <div class="-mt-[var(--header-height)]">
    <!-- Hero -->
    <section
      v-for="hero in content.hero"
      :key="hero._uid"
    >
      <BlockHero
        v-if="hero.component === 'hero_media'"
        :block="hero"
      />
    </section>

    <!-- <BlockCarousel /> -->

    <!-- Blocks -->
    <section
      v-for="(block, index) in content.blocks"
      :key="block._uid"
      class="content-blocks__item"
      :class="[
        `content-blocks__item--${block.component}`,
        block.text_color && colourText[block.text_color],
        block.background_color && colourBackground[block.background_color],
        checkBackgroundMatchesPrevBackground(index) ? 'content-blocks__item--same-background' : '',
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

      <!-- <Screen :log="block" /> -->
    </section>
  </div>
</template>

<style lang="postcss">
.content-blocks__item:not(
  .content-blocks__item--block_image,
  .content-blocks__item--block_split,
  .content-blocks__item--block_carousel
) {
  padding-block: 160px;
}

.content-blocks__item:not([class*="bg-"]) + .content-blocks__item.bg-warm-grey,
.content-blocks__item.bg-warm-grey + .content-blocks__item:not([class*="bg-"]),
.content-blocks__item--same-background {
  padding-block-start: 0;
}
</style>
