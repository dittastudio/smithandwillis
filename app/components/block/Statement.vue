<script lang="ts" setup>
import type { BlockStatement } from '#storyblok-components'

interface Props {
  block: BlockStatement
}

const { block } = defineProps<Props>()

const alignmentClasses: Record<BlockStatement['text_alignment'], string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

type StatementFontSize = keyof typeof statementFontSizes

const statementFontSizes: Record<'1' | '2' | '3' | '4' | '5', { min: number, max: number }> = {
  1: { min: 16, max: 18 },
  2: { min: 19, max: 26 },
  3: { min: 21, max: 34 },
  4: { min: 24, max: 42 },
  5: { min: 28, max: 50 },
}

const statementFontSize = computed(() => {
  const { value } = block.text_size as { value: StatementFontSize }

  return statementFontSizes[value]
})
</script>

<template>
  <div
    v-editable="block"
    class="wrapper grid grid-cols-12 gap-x-(--app-inner-gutter)"
    :class="alignmentClasses[block.text_alignment]"
  >
    <div
      class="flex flex-col gap-y-8 md:gap-y-10 col-span-full"
      :class="{
        'md:col-span-6': block.text_placement !== 'center' || block.text_alignment !== 'center',
        'md:col-start-4': block.text_placement === 'center' && block.text_alignment !== 'center',
        'md:col-start-7': block.text_placement === 'right',
        'place-self-center': block.text_placement === 'center' && block.text_alignment === 'center',
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
          '--fluid-min': statementFontSize.min,
          '--fluid-max': statementFontSize.max,
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
