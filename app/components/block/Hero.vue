<script lang="ts" setup>
import type { BlockHero } from '#storyblok-components'

interface Props {
  block: BlockHero
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    data-component="hero-image"
    class="isolate h-svh bg-offblack relative overflow-hidden text-white"
  >
    <HeroCover
      v-if="block.show_logo"
      class="z-1 absolute inset-0"
    />

    <HeroScrollDown>
      <UiParallax>
        <template
          v-for="item in block.items"
          :key="item._uid"
        >
          <picture v-if="isImageComponent(item) && item.image_desktop?.filename">
            <MediaSource
              :media="getMediaQuery('md')"
              :width="16"
              :height="9"
              :src="item.image_desktop.filename"
              sizes="sm:100vw md:100vw lg:100vw"
            />

            <MediaSource
              :width="10"
              :height="16"
              :src="item.image_mobile?.filename || item.image_desktop.filename"
              sizes="2xs:100vw xs:100vw sm:100vw"
            />

            <NuxtImg
              srcset=""
              class="size-full object-cover"
              :src="item.image_desktop.filename"
              :alt="item.image_mobile?.alt || item.image_desktop.alt || 'Smith & Willis'"
              loading="eager"
              preload
            />
          </picture>

          <template v-else-if="isVideoComponent(item)">
            <MediaVideo
              v-if="item.video_mobile?.filename"
              :class="[
                'size-full object-cover',
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
        </template>
      </UiParallax>
    </HeroScrollDown>
  </div>
</template>
