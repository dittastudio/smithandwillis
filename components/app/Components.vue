<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

interface Props {
  content: PageStoryblok
}

const { content } = defineProps<Props>()
const coverVisible = useState<boolean>('coverVisible')
const checkBackgroundMatchesPrevBackground = (index: number) => (index === 0)
  ? false
  : content?.blocks?.[index].background_color === content.blocks?.[index - 1].background_color
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
        ['block_text', 'block_split'].includes(block.component) && colourText[block.text_color || 'offblack'],
        ['block_text', 'block_split'].includes(block.component) && colourBackground[block.background_color || 'warmgrey'],
        ['block_text', 'block_split'].includes(block.component) && checkBackgroundMatchesPrevBackground(index) ? 'content-blocks__item--same-background' : '',
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

<style lang="postcss">
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
