<script setup lang="ts">
import type { RichtextStoryblok } from '@/types/storyblok'
import IconLogoMark from '@/assets/icons/logo-mark.svg'
// import { storyblokRichTextContent } from '@/utils/storyblok'

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

console.table({
  studioTitle,
  studio,
  placesTitle,
  places,
  contactTitle,
  contact,
})

const currentYear = computed(() => new Date().getFullYear())
const classesFooterLink = 'block opacity-100 hover:opacity-70 transition-opacity duration-300 ease-out'
const classesMetaLink = 'block opacity-70 hover:opacity-100 transition-opacity duration-300 ease-out'
</script>

<template>
  <footer class="bg-rich-brown text-white pt-20 pb-16">
    <div class="wrapper">
      <div class="grid gap-x-[var(--app-inner-gutter)] gap-y-8 grid-cols-2 md:grid-cols-12">
        <div class="col-span-full sm:col-span-1 md:col-span-3 lg:col-span-2 flex flex-col gap-4">
          <h4 class="type-mix-medium-caps">
            Studio
          </h4>

          <a
            href="/"
            :class="classesFooterLink"
          >
            <address class="type-sans-medium not-italic">
              1 Hat & Mitre Court
              <br>
              London
              <br>
              EC1M 4EH
            </address>
          </a>
        </div>

        <div class="col-span-full sm:col-span-1 md:col-span-3 lg:col-span-2 flex flex-col gap-4">
          <h4 class="type-mix-medium-caps">
            Places
          </h4>

          <ul class="type-sans-medium">
            <li>
              <a
                href="/"
                :class="classesFooterLink"
              >
                Luca
              </a>
            </li>

            <li>
              <a
                href="/"
                :class="classesFooterLink"
              >
                Osip
              </a>
            </li>

            <li>
              <a
                href="/"
                :class="classesFooterLink"
              >
                The Loft
              </a>
            </li>
          </ul>
        </div>

        <div class="col-span-full md:col-span-3 lg:col-span-3 flex flex-col gap-4">
          <h4 class="type-mix-medium-caps">
            Contact
          </h4>

          <ul class="type-sans-medium">
            <li>
              <a
                href="mailto:hello@smithandwillis.london"
                :class="classesFooterLink"
              >
                hello@smithandwillis.london
              </a>
            </li>

            <li>
              <a
                href="mailto:careers@smithandwillis.london"
                :class="classesFooterLink"
              >
                careers@smithandwillis.london
              </a>
            </li>

            <li>
              <a
                href="tel:+442038965454"
                :class="classesFooterLink"
              >
                +44 203 896 5454
              </a>
            </li>
          </ul>
        </div>

        <div class="col-span-full md:col-span-3 lg:col-span-5 max-md:mx-auto max-md:mt-2 md:ml-auto">
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
