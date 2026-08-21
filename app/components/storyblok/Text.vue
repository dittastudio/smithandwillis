<script lang="ts" setup>
import type { SbRichTextInput } from '@storyblok/richtext'
import type { StoryblokRichTextDoc } from '#storyblok-types'
import { StoryblokTextLink } from '#components'

interface Props {
  html?: StoryblokRichTextDoc
}

const { html } = defineProps<Props>()

const render = useStoryblokRichText({
  components: {
    link: StoryblokTextLink,
  },
})

const richText = computed(() => (html ? () => render(html as SbRichTextInput) : null))
</script>

<template>
  <component
    :is="richText"
    v-if="richText"
  />
</template>
