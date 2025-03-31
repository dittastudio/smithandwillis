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

// useState('reservationsOpen', () => false)
// useState('navigationOpen', () => false)
// useNavigation(false)
</script>

<template>
  <div>
    <AppLayout>
      <template #header>
        <AppHeader>
          <template #navigation-primary>
            <AppNavigation
              v-if="settings?.content?.navigation_primary?.length"
              :items="settings.content.navigation_primary"
            />
          </template>

          <template #navigation-secondary>
            <AppNavigation
              v-if="settings?.content?.navigation_secondary?.length"
              :items="settings.content.navigation_secondary"
            />
          </template>
        </AppHeader>
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
