<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

const route = useRoute()
const story = await useStoryblokStory<PageStoryblok>(route.path)

useStoryblokSetup<PageStoryblok>(story)
</script>

<template>
  <div>
    <BlockComponents :content="story.content" />
  </div>
</template>
