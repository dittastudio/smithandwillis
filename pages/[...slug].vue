<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

const route = useRoute()
const story = await useStoryblokStory<PageStoryblok>(route.path)

useStoryblokSetup<PageStoryblok>(story)
</script>

<template>
  <div>
    <AppComponents
      v-if="story?.content"
      :content="story.content"
    />
  </div>
</template>
