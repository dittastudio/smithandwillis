<script lang="ts" setup>
import type { Settings } from '@@/.storyblok/types/332344/storyblok-components'

const story = await useStory<Settings>('/settings')
const route = useRoute()

const globalClasses = computed(() => ({
  'is-storyblok-editor': storyblokEditor(route.query),
}))

useHead({
  htmlAttrs: {
    class: globalClasses,
  },
})

useSeoMeta({
  titleTemplate: title => (title ? `${title} - Smith & Willis` : 'Smith & Willis'),
  robots: 'index, follow',
})

const menuOpen = useState<boolean>('menuOpen', () => false)

watch(() => route.fullPath, async () => {
  await wait(500)
  menuOpen.value = false
})
</script>

<template>
  <div>
    <AppLayout>
      <template #header>
        <AppHeader
          v-if="story"
          :primary-navigation="story.content.navigation_primary"
          :secondary-navigation="story.content.navigation_secondary"
          :studio-title="story.content.studio_title"
          :studio="story.content.studio"
          :contact-title="story.content.contact_title"
          :contact="story.content.contact"
        />
      </template>

      <template #main>
        <NuxtPage />
      </template>

      <template #footer>
        <AppFooter
          v-if="story.content"
          :footer-navigation="story.content.footer_navigation"
          :studio-title="story.content.studio_title"
          :studio="story.content.studio"
          :places-title="story.content.places_title"
          :places="story.content.places"
          :contact-title="story.content.contact_title"
          :contact="story.content.contact"
        />
      </template>

      <template #dev>
        <DevGuide />
      </template>
    </AppLayout>
  </div>
</template>
