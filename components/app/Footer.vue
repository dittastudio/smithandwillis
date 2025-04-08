<script setup lang="ts">
import type { RichtextStoryblok } from '@/types/storyblok'
import IconLogoMark from '@/assets/icons/logo-mark.svg'

interface Props {
  studioTitle?: string
  studio?: RichtextStoryblok
  placesTitle?: string
  places?: RichtextStoryblok
  contactTitle?: string
  contact?: RichtextStoryblok
}

const {
  studioTitle,
  studio,
  placesTitle,
  places,
  contactTitle,
  contact,
} = defineProps<Props>()

const currentYear = computed(() => new Date().getFullYear())
const classesMetaLink = 'block opacity-70 hover:opacity-100 transition-opacity duration-300 ease-out'
const classesFooterProse = '[&_p_a]:transition-opacity [&_p_a]:duration-300 [&_p_a]:ease-out [&_p_a]:opacity-100 [&_p_a]:hover:opacity-70'
</script>

<template>
  <footer class="bg-rich-brown text-white pt-20 pb-16">
    <div class="wrapper">
      <div class="grid gap-x-[var(--app-inner-gutter)] sm:gap-y-8 grid-cols-2 md:grid-cols-12">
        <div class="col-span-full sm:col-span-1 md:col-span-3 lg:col-span-2">
          <AppFooterAccordion
            id="studio"
          >
            <template #title>
              <h4 class="type-sans-medium-caps">
                {{ studioTitle }}
              </h4>
            </template>

            <template #content>
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
            </template>
          </AppFooterAccordion>
        </div>

        <div class="col-span-full sm:col-span-1 md:col-span-3 lg:col-span-2">
          <AppFooterAccordion
            id="studio"
          >
            <template #title>
              <h4 class="type-sans-medium-caps">
                {{ placesTitle }}
              </h4>
            </template>

            <template #content>
              <div
                v-if="storyblokRichTextContent(places)"
                :class="[
                  'type-sans-medium',
                  classesFooterProse,
                ]"
              >
                <StoryblokText :html="places" />
              </div>
            </template>
          </AppFooterAccordion>
        </div>

        <div class="col-span-full md:col-span-4 lg:col-span-3">
          <AppFooterAccordion
            id="studio"
          >
            <template #title>
              <h4 class="type-sans-medium-caps">
                {{ contactTitle }}
              </h4>
            </template>

            <template #content>
              <div
                v-if="storyblokRichTextContent(contact)"
                :class="[
                  'type-sans-medium',
                  classesFooterProse,
                ]"
              >
                <StoryblokText :html="contact" />
              </div>
            </template>
          </AppFooterAccordion>
        </div>

        <div class="col-span-full md:col-span-2 lg:col-span-5 max-md:mx-auto max-md:mt-10 md:ml-auto">
          <IconLogoMark
            class="size-22 md:size-18 lg:size-25 opacity-10"
          />
        </div>
      </div>

      <div class="app-footer__meta-container mt-10 md:mt-16">
        <ul class="app-footer__meta-list type-mix-xsmall-caps flex flex-col items-center md:flex-row md:flex-wrap md:justify-start md:items-start md:text-left gap-y-3">
          <li class="app-footer__meta-item">
            <p class="app-footer__meta-link opacity-70">
              &copy;{{ currentYear }} All rights reserved
            </p>
          </li>

          <li class="app-footer__meta-item">
            <a
              href="/"
              class="app-footer__meta-link"
              :class="classesMetaLink"
            >
              Privacy Policy
            </a>
          </li>

          <li class="app-footer__meta-item">
            <a
              href="/"
              class="app-footer__meta-link"
              :class="classesMetaLink"
            >
              Made by ditta
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style>
@reference "../../assets/css/main.css";

.app-footer__meta-container {
  @variant md {
    overflow: hidden;
  }
}

.app-footer__meta-list {
  @variant md {
    margin-inline: -1.25em;
  }
}

.app-footer__meta-item {
  @variant md {
    position: relative;

    &:before {
      content: '/';
      position: absolute;
      left: -0.3em;
      top: 0;
      opacity: 0.7;
      pointer-events: none;
    }
  }
}

.app-footer__meta-link {
  @variant md {
    display: block;
    padding-inline: 1.25em;
  }
}
</style>
