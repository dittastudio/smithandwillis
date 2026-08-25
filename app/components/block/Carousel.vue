<script lang="ts" setup>
import type { BlockCarousel } from '#storyblok-components'
import type { Carousel } from '@/components/ui/Carousel.vue'
import IconChevronLeft from '@/assets/icons/chevron-left.svg'
import IconChevronRight from '@/assets/icons/chevron-right.svg'

interface Props {
  block: BlockCarousel
}

const { block } = defineProps<Props>()

const ratioMobile = computed(() => ratioDimensions(block.ratio_mobile))
const ratioDesktop = computed(() => ratioDimensions(block.ratio_desktop))
const ratioMobileClass = computed(() => ratios[block.ratio_mobile] ?? '')
const ratioDesktopClass = computed(() => ratios[`md-${block.ratio_desktop}`] ?? '')

const carouselRef = useTemplateRef<Carousel>('carouselRef')

const previous = () => carouselRef.value?.previous()
const next = () => carouselRef.value?.next()
</script>

<template>
  <div
    v-editable="block"
    class="size-full isolate relative"
  >
    <UiCarousel
      ref="carouselRef"
      :items="block.slides"
      :options="{ loop: true }"
      :autoplay-interval="5000"
      :autoplay="Boolean(block.autoplay)"
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
      </template>
    </UiCarousel>

    <button
      type="button"
      class="absolute top-1/2 left-0 -translate-y-1/2 z-1 p-(--app-outer-gutter) filter-shadow-light group"
      @click="previous"
    >
      <IconChevronLeft class="w-3.5 h-6 text-current opacity-80 transition-[opacity,translate] duration-200 ease-out group-hover:-translate-x-1 group-hover:opacity-100" />

      <span class="sr-only">Previous</span>
    </button>

    <button
      type="button"
      class="absolute top-1/2 right-0 -translate-y-1/2 z-1 p-(--app-outer-gutter) filter-shadow-light group"
      @click="next"
    >
      <IconChevronRight class="w-3.5 h-6 text-current opacity-80 transition-[opacity,translate] duration-200 ease-out group-hover:translate-x-1 group-hover:opacity-100" />

      <span class="sr-only">Next</span>
    </button>
  </div>
</template>
