<script lang="ts" setup>
import type { BlockText } from '#storyblok-components'

interface Props {
  block: BlockText
}

const { block } = defineProps<Props>()

const placementClasses: Record<BlockText['text_placement'], string> = {
  left: 'items-start',
  center: 'items-center',
  right: 'items-end',
}

const alignmentClasses: Record<BlockText['text_alignment'], string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
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
      v-if="storyblokRichTextContent(block.text)"
      class="prose prose-p:type-serif-large prose-h1:type-serif-large-caps prose-h4:type-sans-medium-caps"
      :class="{
        'w-3/4 md:w-1/2 md:pl-[calc(var(--app-inner-gutter)*0.5)]': block.text_placement === 'right' && block.text_alignment === 'left',
      }"
    >
      <StoryblokText :html="block.text" />
    </div>

    <StoryblokLink
      v-if="block.link?.cached_url"
      :item="block.link"
      class="p-4 -m-4 type-serif-small-caps"
    >
      <UiTextLink :is-external="block.link.linktype === 'url'">
        {{ block.link_title }}
      </UiTextLink>
    </StoryblokLink>
  </div>
</template>
