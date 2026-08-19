<script lang="ts" setup>
import type { BlockMediaGrid } from '#storyblok-components'

interface Props {
  block: BlockMediaGrid
}

const { block } = defineProps<Props>()

const ratioMobile = computed(() => ratioDimensions(block.ratio_mobile))
const ratioDesktop = computed(() => ratioDimensions(block.ratio_desktop))
</script>

<template>
  <ul
    v-editable="block"
    :class="['grid grid-cols-1 gap-2.5', {
      'md:grid-cols-2': block.items.length === 2,
      'md:grid-cols-3': block.items.length === 3,
    }]"
  >
    <li
      v-for="item in block.items"
      :key="item._uid"
    >
      <figure class="relative size-full">
        <picture v-if="isGridImageComponent(item) && item.image_desktop?.filename">
          <MediaSource
            :media="getMediaQuery('md')"
            :width="ratioDesktop.width"
            :height="ratioDesktop.height"
            :src="item.image_desktop.filename"
            sizes="sm:100vw md:100vw lg:100vw"
          />

          <MediaSource
            v-if="item.image_mobile?.filename || item.image_desktop?.filename"
            :width="ratioMobile.width"
            :height="ratioMobile.height"
            :src="item.image_mobile?.filename || item.image_desktop.filename"
            sizes="2xs:100vw xs:100vw sm:100vw"
          />

          <NuxtImg
            srcset=""
            class="size-full object-cover"
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
              { 'md:hidden': item.video_desktop?.filename },
            ]"
            class="size-full object-cover"
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
              { 'hidden md:block': item.video_mobile?.filename },
            ]"
            class="size-full object-cover"
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
          v-if="item.title || item.sub_title"
          class="absolute inset-0 flex flex-col items-start justify-end contain-layout contain-paint text-white"
        >
          <div class="sticky bottom-0">
            <div class="block-image__gradient p-(--app-outer-gutter)">
              <StoryblokLink
                v-if="item.link?.cached_url"
                :item="item.link"
                class="block p-(--app-outer-gutter) -m-(--app-outer-gutter)"
              >
                <UiTextLink
                  as="div"
                  :is-external="item.link.linktype === 'url'"
                >
                  <h4 class="type-serif-medium-caps flex items-center gap-2">
                    {{ item.title }}
                  </h4>
                </UiTextLink>

                <p class="opacity-80 type-serif-medium transition-opacity duration-300 ease-out [a:hover_&]:opacity-70 italic">
                  {{ item.sub_title }}
                </p>
              </StoryblokLink>

              <div
                v-else
                class="flex flex-col"
              >
                <h4 class="type-serif-medium-caps flex items-center gap-2">
                  {{ item.title }}
                </h4>

                <p class="opacity-80 type-serif-medium italic">
                  {{ item.sub_title }}
                </p>
              </div>
            </div>
          </div>
        </figcaption>
      </figure>
    </li>
  </ul>
</template>
