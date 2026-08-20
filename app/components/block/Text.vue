<script lang="ts" setup>
import type { BlockText } from '#storyblok-components'

interface Props {
  block: BlockText
}

const { block } = defineProps<Props>()

const placementClasses: Record<BlockText['text_placement'], string> = {
  left: 'items-start',
  center: 'items-center',
  right: 'md:items-end',
}

const alignmentClasses: Record<BlockText['text_alignment'], string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const isPlaceRightAndAlignLeft = computed(() => {
  return block.text_placement === 'right' && block.text_alignment === 'left'
})
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
          prose
          prose-p:type-serif-large
          prose-p:max-w-[60ch]
          prose-p:text-pretty
          prose-headings:text-balance
          prose-headings:mb-8
          prose-headings:md:mb-10
          prose-headings-before:mt-[4lh]
          prose-h1:type-serif-large-caps
          prose-h2:type-serif-large-caps
          prose-h3:type-serif-large-caps
          prose-h4:type-sans-medium-caps
          prose-h5:type-sans-medium-caps
          prose-h6:type-sans-medium-caps
        "
      >
        <StoryblokText :html="block.text" />
      </div>

      <StoryblokLink
        v-if="block.link?.cached_url"
        :item="block.link"
        class="p-4 -m-4 type-serif-large italic"
      >
        <UiTextLink :is-external="block.link.linktype === 'url'">
          {{ block.link_title }}
        </UiTextLink>
      </StoryblokLink>
    </div>
  </div>
</template>
