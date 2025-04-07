<script lang="ts" setup>
import type { BlockTextStoryblok } from '@/types/storyblok'
import { storyblokRichTextContent } from '@/utils/storyblok'

interface Props {
  block: BlockTextStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div v-editable="block">
    <p v-if="block.headline">
      {{ block.headline }}
    </p>

    <StoryblokText
      v-if="storyblokRichTextContent(block.text)"
      :html="block.text"
    />
  </div>
</template>
