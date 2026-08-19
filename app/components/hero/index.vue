<script lang="ts" setup>
import type { Hero } from '#storyblok-components'

interface Props {
  block: Hero
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    data-component="hero-image"
    class="relative overflow-hidden isolate h-svh bg-offblack text-white"
  >
    <HeroCover
      v-if="block.show_logo"
      class="absolute inset-0 z-1"
    />

    <HeroScrollDown>
      <UiParallax>
        <template
          v-for="item in block.items"
          :key="item._uid"
        >
          <picture
            v-if="item.component === 'image' && item.image_desktop?.filename"
          >
            <MediaSource
              media="(orientation: landscape)"
              :width="16"
              :height="9"
              :src="item.image_desktop.filename"
              sizes="sm:100vw md:100vw lg:100vw"
            />

            <MediaSource
              v-if="item.image_mobile?.filename"
              media="(orientation: portrait)"
              :width="10"
              :height="16"
              :src="item.image_mobile.filename"
              sizes="2xs:100vw xs:100vw sm:100vw"
            />

            <NuxtImg
              srcset=""
              class="size-full object-cover"
              :src="item.image_desktop.filename"
              :alt="item.image_desktop.alt ?? ''"
              loading="eager"
              preload
            />
          </picture>
        </template>
      </UiParallax>
    </HeroScrollDown>
  </div>
</template>
