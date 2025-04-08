<script lang="ts" setup>
import type { RichtextStoryblok } from '@/types/storyblok'

interface Props {
  studioTitle?: string
  studio?: RichtextStoryblok
  contactTitle?: string
  contact?: RichtextStoryblok
}

const { studioTitle, studio, contactTitle, contact } = defineProps<Props>()

const menuOpen = useState<boolean>('menuOpen')

const classesFooterProse = '[&_p_a]:transition-opacity [&_p_a]:duration-300 [&_p_a]:ease-out [&_p_a]:opacity-100 [&_p_a]:hover:opacity-70'
</script>

<template>
  <div
    class="
      app-header-menu
      max-md:pointer-events-auto
      max-md:absolute
      max-md:inset-0
      max-md:min-h-dvh
      max-md:-z-1
      max-md:bg-rich-brown
      max-md:text-white
      max-md:pt-[calc(var(--header-height)_+_--spacing(6))]
      max-md:pb-[var(--app-outer-gutter)]
    "
    :class="{ 'app-header-menu--is-open': menuOpen }"
  >
    <div
      class="
        app-header-menu__inner
        max-md:flex
        max-md:flex-col
        max-md:justify-between
        max-md:h-full
      "
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
              classesFooterProse,
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
                classesFooterProse,
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

<style>
@reference "../../assets/css/main.css";
.app-header-menu {
  @variant max-md {
    transition: opacity 0.5s var(--ease-in-out), visibility 0.5s var(--ease-in-out);
    opacity: 0;
    visibility: hidden;
    padding-inline: var(--app-outer-gutter);

    &--is-open {
      opacity: 1;
      visibility: visible;
    }
  }

  html:has(&.app-header-menu--is-open) {
    overflow: hidden;
  }
}

.app-header-menu__inner {
  @variant md {
    display: flex;
    justify-content: space-between;
  }

  @variant max-md {
    transition: opacity 0.15s var(--ease-in-out);
    opacity: 0;

    .app-header-menu--is-open & {
      transition: opacity 0.5s var(--ease-in-out) 0.4s;
      opacity: 1;
    }
  }
}
</style>
