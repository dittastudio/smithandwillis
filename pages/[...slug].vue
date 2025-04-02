<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

const route = useRoute()
const story = await useStoryblokStory<PageStoryblok>(route.path)

useStoryblokSetup<PageStoryblok>(story)
</script>

<template>
  <div>
    <BlockComponents
      v-if="story?.content"
      :content="story.content"
    />

    <Screen :log="story" />
  </div>
</template>
