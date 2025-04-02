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
// useMenu(false)
</script>

<template>
  <div>
    <AppLayout>
      <template #header>
        <AppHeader
          :primary-navigation="settings?.content?.navigation_primary"
          :secondary-navigation="settings?.content?.navigation_secondary"
        />
      </template>

      <template #main>
        <NuxtPage />
      </template>

      <template #footer>
        <AppFooter />
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
