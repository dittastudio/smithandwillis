<script lang="ts" setup>
import type { SettingsStoryblok } from '@@/types/storyblok'

const settings = await useStory('/settings')
const content = settings.value.content as SettingsStoryblok
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
        <span class="sr-only">
          PRERENDER: {{ $config.public.PRERENDER }}
        </span>

        <AppHeader
          v-if="content"
          :primary-navigation="content.navigation_primary"
          :secondary-navigation="content.navigation_secondary"
          :studio-title="content.studio_title"
          :studio="content.studio"
          :contact-title="content.contact_title"
          :contact="content.contact"
        />
      </template>

      <template #main>
        <NuxtPage />
      </template>

      <template #footer>
        <AppFooter
          v-if="content"
          :footer-navigation="content.footer_navigation"
          :studio-title="content.studio_title"
          :studio="content.studio"
          :places-title="content.places_title"
          :places="content.places"
          :contact-title="content.contact_title"
          :contact="content.contact"
        />
      </template>

      <template #dev>
        <DevGuide />
      </template>
    </AppLayout>
  </div>
</template>
