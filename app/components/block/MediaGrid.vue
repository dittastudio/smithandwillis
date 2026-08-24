<script lang="ts" setup>
import type { BlockMediaGrid } from '#storyblok-components'

interface Props {
  block: BlockMediaGrid
}

const { block } = defineProps<Props>()

const StoryblokLink = resolveComponent('StoryblokLink')

const ratioMobile = computed(() => ratioDimensions(block.ratio_mobile))
const ratioDesktop = computed(() => ratioDimensions(block.ratio_desktop))
const ratioMobileClass = computed(() => ratios[block.ratio_mobile] ?? '')
const ratioDesktopClass = computed(() => ratios[`md-${block.ratio_desktop}`] ?? '')

const items = computed(() => block.items ?? [])

const sizesDesktop = computed(() => {
  switch (items.value.length) {
    case 2:
      return 'sm:100vw md:50vw lg:50vw'
    case 3:
      return 'sm:100vw md:33.33vw lg:33.33vw'
    default:
      return 'sm:100vw md:100vw lg:100vw'
  }
})
</script>

<template>
  <ul
    v-editable="block"
    :class="['grid grid-cols-1 gap-1', {
      'md:grid-cols-2': items.length === 2,
      'md:grid-cols-3': items.length === 3,
    }]"
  >
    <li
      v-for="item in items"
      :key="item._uid"
    >
      <component
        :is="item.link?.cached_url ? StoryblokLink : 'div'"
        v-bind="item.link?.cached_url ? { item: item.link } : {}"
        class="relative size-full block"
      >
        <figure class="relative size-full">
          <picture v-if="isGridImageComponent(item) && item.image_desktop?.filename">
            <MediaSource
              :media="getMediaQuery('md')"
              :width="ratioDesktop.width"
              :height="ratioDesktop.height"
              :src="item.image_desktop.filename"
              :sizes="sizesDesktop"
            />

            <MediaSource
              v-if="item.image_mobile?.filename || item.image_desktop?.filename"
              :width="ratioMobile.width"
              :height="ratioMobile.height"
              :src="item.image_mobile?.filename || item.image_desktop.filename"
              sizes="2xs:100vw xs:100vw sm:100vw"
            />

            <NuxtImg
              :class="['size-full object-cover', ratioMobileClass, ratioDesktopClass]"
              srcset=""
              :src="item.image_desktop.filename"
              :alt="item.image_mobile?.alt || item.image_desktop.alt || 'Smith & Willis'"
              loading="lazy"
            />
          </picture>

          <template v-else-if="isGridVideoComponent(item)">
            <MediaVideo
              v-if="item.video_mobile?.filename"
              :class="[
                'size-full object-cover',
                ratioMobileClass, ratioDesktopClass,
                { 'md:hidden': item.video_desktop?.filename },
              ]"
              :sources="[
                { src: item.video_mobile.filename },
              ]"
              playsinline
              autoplay
              muted
              loop
              lazy
            />

            <MediaVideo
              v-if="item.video_desktop?.filename"
              :class="[
                'size-full object-cover',
                ratioMobileClass, ratioDesktopClass,
                { 'hidden md:block': item.video_mobile?.filename },
              ]"
              :sources="[
                { src: item.video_desktop.filename },
              ]"
              playsinline
              autoplay
              muted
              loop
              lazy
            />
          </template>

          <figcaption
            v-if="item.title || item.subtitle"
            class="absolute inset-0 flex flex-col items-start justify-end contain-layout contain-paint text-white"
          >
            <div class="sticky bottom-0">
              <div class="gradient p-(--app-outer-gutter)">
                <UiTextLink
                  v-if="item.link?.cached_url"
                  as="div"
                  :is-external="item.link.linktype !== 'story'"
                >
                  <h4 class="type-serif-medium-caps flex items-center gap-2">
                    {{ item.title }}
                  </h4>
                </UiTextLink>

                <h4
                  v-else
                  class="type-serif-medium-caps flex items-center gap-2"
                >
                  {{ item.title }}
                </h4>

                <p class="opacity-80 type-serif-medium transition-opacity duration-300 ease-out [a:hover_&]:opacity-70 italic">
                  {{ item.subtitle }}
                </p>
              </div>
            </div>
          </figcaption>
        </figure>
      </component>
    </li>
  </ul>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.gradient {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: calc(-1 * var(--app-outer-gutter));
    right: -50vw;
    bottom: 0;
    opacity: 0.5;
    height: 300%;
    background-image: radial-gradient(ellipse at 0% 100%, --alpha(var(--color-black) / 100%) 0%, --alpha(var(--color-black) / 0%) 60%);
    z-index: -1;
    pointer-events: none;
  }
}
</style>
