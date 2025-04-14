<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

const route = useRoute()
const story = await useStoryblokStory<PageStoryblok>(route.path)

useStoryblokSetup<PageStoryblok>(story)

// const isHome = computed(() => ['/', '/home'].includes(route.path))
</script>

<template>
  <div>
    <!-- <AppCover v-if="isHome" /> -->

    <AppComponents
      v-if="story?.content"
      :content="story.content"
    />
  </div>
</template>
