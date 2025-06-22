<script lang="ts" setup>
import type { StoryblokRichtext } from '@@/.storyblok/types/storyblok'

interface Props {
  studioTitle?: string
  studio?: StoryblokRichtext
  contactTitle?: string
  contact?: StoryblokRichtext
}

const { studioTitle, studio, contactTitle, contact } = defineProps<Props>()

const menuOpen = useState<boolean>('menuOpen')
const classesHeaderProse = '[&_p_a]:transition-opacity [&_p_a]:duration-300 [&_p_a]:ease-out [&_p_a]:opacity-100 [&_p_a]:hover:opacity-70'
</script>

<template>
  <div
    class="
      app-header-menu
      max-md:absolute
      max-md:inset-0
      max-md:min-h-dvh
      max-md:-z-1
      max-md:bg-rich-brown
      max-md:text-white
      max-md:pt-[calc(var(--app-header-height)_+_--spacing(6))]
      max-md:pb-[var(--app-outer-gutter)]
      max-md:px-[var(--app-outer-gutter)]
      max-md:overflow-y-auto
      max-md:overscroll-contain
      max-md:transition-[opacity,visibility]
      max-md:duration-500
      max-md:ease-in-out
    "
    :class="{
      'max-md:opacity-0 max-md:invisible': !menuOpen,
      'max-md:opacity-100 max-md:visible': menuOpen,
    }"
  >
    <div
      class="
        flex
        max-md:flex-col
        max-md:justify-between
        max-md:gap-y-20
        max-md:min-h-full
        max-md:transition-opacity
        max-md:ease-in-out
      "
      :class="{
        'max-md:opacity-0 max-md:duration-150': !menuOpen,
        'max-md:opacity-100 max-md:duration-500 max-md:delay-400': menuOpen,
      }"
    >
      <div class="md:flex md:justify-between md:w-full">
        <slot />
      </div>

      <div class="flex flex-col gap-y-8 md:hidden">
        <div class="flex flex-col gap-y-3">
          <h4 class="type-sans-medium-caps">
            {{ studioTitle }}
          </h4>

          <div
            v-if="storyblokRichTextContent(contact)"
            :class="[
              'type-sans-medium',
              classesHeaderProse,
            ]"
          >
            <StoryblokText :html="contact" />
          </div>
        </div>

        <div class="flex flex-col gap-y-3">
          <h4 class="type-sans-medium-caps">
            {{ contactTitle }}
          </h4>

          <address class="type-sans-medium not-italic">
            <div
              v-if="storyblokRichTextContent(studio)"
              :class="[
                'type-inherit',
                classesHeaderProse,
              ]"
            >
              <StoryblokText :html="studio" />
            </div>
          </address>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.app-header-menu {
  html:has(&.app-header-menu--is-open) {
    overflow: hidden;
  }
}
</style>
