<script lang="ts" setup>
import type { BlockCarousel } from '#storyblok-components'
import type { Carousel } from '@/components/ui/Carousel.vue'

interface Props {
  block: BlockCarousel
}

const { block } = defineProps<Props>()

const ratioMobile = computed(() => ratioDimensions(block.ratio_mobile))
const ratioDesktop = computed(() => ratioDimensions(block.ratio_desktop))
const carouselRef = useTemplateRef<Carousel>('carouselFade')
</script>

<template>
  <div v-editable="block">
    <UiCarousel
      ref="carouselRef"
      :items="block.slides"
      :options="{ loop: Boolean(block.autoplay) }"
      :autoplay-interval="5000"
      autoplay
    >
      <template #item="{ item }">
        <picture v-if="isImageComponent(item) && item.image_desktop?.filename">
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

        <template v-else-if="isVideoComponent(item)">
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
      </template>
    </UiCarousel>
  </div>
</template>
