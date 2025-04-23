<script lang="ts" setup>
import type { SettingsStoryblok } from '@/types/storyblok'

const settings = await useStoryblokStory<SettingsStoryblok>('/settings')
const route = useRoute()
const isDev = import.meta.dev

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

useState('menuOpen', () => false)
useState('coverVisible', () => true)
useState('hasHeroBlocks', () => false)

const menuOpen = useState<boolean>('menuOpen')
const coverVisible = useState<boolean>('coverVisible')
const hasHeroBlocks = useState<boolean>('hasHeroBlocks')

const handleCoverVisible = (value: boolean) => {
  coverVisible.value = value
}

const checkForHeroBlocks = async (path: string) => {
  if (import.meta.client) {
    try {
      const runtimeConfig = useRuntimeConfig()
      const storyblokApi = useStoryblokApi()
      const storyBlokSlug = storyblokSlug(path)

      const { data } = await storyblokApi.get(`cdn/stories${storyBlokSlug}`, {
        version: runtimeConfig.public.STORYBLOK_VERSION === 'published' ? 'published' : 'draft',
        resolve_relations: [],
      })

      if (data?.story?.content?.hero) {
        hasHeroBlocks.value = data.story.content.hero.length > 0
      }
      else {
        hasHeroBlocks.value = false
      }
    }
    catch {
      hasHeroBlocks.value = false
    }
  }
}

watch(() => route.fullPath, async () => {
  menuOpen.value = false
  await checkForHeroBlocks(route.path)
})

// Initial check
onMounted(async () => {
  await checkForHeroBlocks(route.path)
})
</script>

<template>
  <div>
    <AppLayout>
      <template #header>
        <AppHeader
          :primary-navigation="settings?.content?.navigation_primary"
          :secondary-navigation="settings?.content?.navigation_secondary"
          :studio-title="settings?.content?.studio_title"
          :studio="settings?.content?.studio"
          :contact-title="settings?.content?.contact_title"
          :contact="settings?.content?.contact"
        />
      </template>

      <template #main>
        <NuxtPage />
      </template>

      <template #footer>
        <AppFooter
          :footer-navigation="settings?.content?.footer_navigation"
          :studio-title="settings?.content?.studio_title"
          :studio="settings?.content?.studio"
          :places-title="settings?.content?.places_title"
          :places="settings?.content?.places"
          :contact-title="settings?.content?.contact_title"
          :contact="settings?.content?.contact"
        />
      </template>

      <template #cover>
        <AppCover @cover-visible="handleCoverVisible" />
      </template>

      <template
        v-if="isDev"
        #dev
      >
        <ToolGuide />
      </template>
    </AppLayout>
  </div>
</template>
