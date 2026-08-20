<script lang="ts" setup>
import type { BlockStatement } from '#storyblok-components'

interface Props {
  block: BlockStatement
}

const { block } = defineProps<Props>()

const placementClasses: Record<BlockStatement['text_placement'], string> = {
  left: 'items-start',
  center: 'items-center',
  right: 'md:items-end',
}

const alignmentClasses: Record<BlockStatement['text_alignment'], string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const isPlaceRightAndAlignLeft = computed(() => {
  return block.text_placement === 'right' && block.text_alignment === 'left'
})

const statementFontSizes: Record<'1' | '2' | '3' | '4' | '5', { min: number, max: number }> = {
  1: { min: 16, max: 18 },
  2: { min: 19, max: 26 },
  3: { min: 21, max: 34 },
  4: { min: 24, max: 42 },
  5: { min: 28, max: 50 },
}
</script>

<template>
  <div
    v-editable="block"
    class="wrapper flex flex-col"
    :class="[
      placementClasses[block.text_placement],
      alignmentClasses[block.text_alignment],
    ]"
  >
    <div
      class="flex flex-col gap-y-8 md:gap-y-10"
      :class="{
        'md:w-1/2 md:pl-[calc(var(--app-inner-gutter)*0.5)]': isPlaceRightAndAlignLeft,
      }"
    >
      <div
        v-if="storyblokRichTextContent(block.text)"
        class="
          block-statment__content
          prose
          prose-p:type-serif-large
          prose-p:max-w-[60ch]
          prose-p:text-balance
        "
        :style="{
          '--fluid-min': statementFontSizes[block.text_size.value].min,
          '--fluid-max': statementFontSizes[block.text_size.value].max,
        }"
      >
        <StoryblokText :html="block.text" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.block-statment__content {
  & p {
    --fluid-min-value: calc(var(--fluid-min) / 16 * 1rem);
    --fluid-max-value: calc(var(--fluid-max) / 16 * 1rem);
    --fluid-value: calc(
      var(--fluid-min-value) + (var(--fluid-max) - var(--fluid-min)) * var(--fluid-bp)
    );

    font-size: clamp(var(--fluid-min-value), var(--fluid-value), var(--fluid-max-value));
    max-width: 50ch;
  }
}
</style>
