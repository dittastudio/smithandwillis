<script setup lang="ts">
import type { Link } from '@@/.storyblok/types/332344/storyblok-components'
import type { StoryblokRichtext } from '@@/.storyblok/types/storyblok'
import IconLogoMark from '@/assets/icons/logo-mark.svg'

interface Props {
  footerNavigation?: Link[] | undefined
  studioTitle?: string
  studio?: StoryblokRichtext
  placesTitle?: string
  places?: StoryblokRichtext
  contactTitle?: string
  contact?: StoryblokRichtext
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
  <div class="bg-rich-brown text-white pt-[var(--app-header-height)] sm:pt-20 pb-16">
    <div class="wrapper">
      <div class="relative grid gap-x-[var(--app-inner-gutter)] sm:gap-y-8 grid-cols-2 md:grid-cols-12">
        <div class="col-span-full sm:col-span-1 md:col-span-3 lg:col-span-2">
          <AppFooterAccordion
            id="accordion-studio"
          >
            <template #title>
              <h4 class="type-sans-medium-caps">
                {{ studioTitle }}
              </h4>
            </template>

            <template #content>
              <address class="not-italic">
                <div
                  v-if="storyblokRichTextContent(studio)"
                  :class="[
                    'type-mix-medium',
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
            id="accordion-places"
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
                  'type-mix-medium',
                  classesFooterProse,
                ]"
              >
                <StoryblokText :html="places" />
              </div>
            </template>
          </AppFooterAccordion>
        </div>

        <div class="col-span-full md:col-span-6">
          <AppFooterAccordion
            id="accordion-contact"
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
                  'type-mix-medium',
                  classesFooterProse,
                ]"
              >
                <StoryblokText :html="contact" />
              </div>
            </template>
          </AppFooterAccordion>
        </div>

        <div class="md:absolute md:right-0 md:top-0 max-md:col-span-full max-md:mx-auto max-md:mt-10 md:ml-auto">
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

          <li
            v-for="item in footerNavigation"
            :key="item._uid"
            class="app-footer__meta-item"
          >
            <StoryblokLink
              v-if="item.link.cached_url"
              :key="item._uid"
              :item="item.link"
              class="app-footer__meta-link"
              :class="classesMetaLink"
            >
              {{ item.title }}
            </StoryblokLink>
          </li>

          <li class="app-footer__meta-item">
            <a
              href="https://ditta.studio"
              target="_blank"
              class="app-footer__meta-link"
              :class="classesMetaLink"
            >
              Made by ditta
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

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
