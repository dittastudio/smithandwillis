<script lang="ts" setup>
import type { RichtextStoryblok } from '@/types/storyblok'
import { StoryblokRichText } from '@storyblok/vue'
// import { storyblokRichTextContent } from '@/utils/storyblok'

interface Props {
  html: RichtextStoryblok
}

const { html } = defineProps<Props>()
</script>

<template>
  <StoryblokRichText
    v-if="html"
    :doc="html"
  />
</template>
