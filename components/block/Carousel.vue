<script lang="ts" setup>
// import type { BlockTextStoryblok } from '@/types/storyblok'
import IconArrowLarge from '@/assets/icons/arrow-large.svg'

import { useKeenSlider } from 'keen-slider/vue.es'
import 'keen-slider/keen-slider.min.css'

interface Props {
  block?: any
}

const { block } = defineProps<Props>()

const images = [
  'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80',
  'https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80',
  'https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80',
  'https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80',
]

const current = ref(0)
const opacities = ref<number[]>([])

const [container, slider] = useKeenSlider({
  initial: current.value,
  slides: images.length,
  loop: true,
  defaultAnimation: {
    duration: 1000,
  },
  slideChanged: (s) => {
    current.value = s.track.details.rel
  },
  detailsChanged: (s) => {
    opacities.value = s.track.details.slides.map(slide => slide.portion)
  },
})
</script>

<template>
  <div
    v-editable="block"
    class="block-carousel"
  >
    <div
      ref="container"
      class="relative overflow-hidden w-full aspect-[9/16] md:aspect-video"
    >
      <div
        v-for="(src, index) in images"
        :key="index"
        class="w-full h-full absolute inset-0"
        :style="{ opacity: opacities[index] }"
      >
        <img
          class="w-full h-full object-cover"
          :src="src"
        >
      </div>

      <div class="absolute inset-0 flex">
        <button
          v-if="slider"
          class="grow w-1/2 flex items-center justify-start p-[var(--app-outer-gutter)] hover:bg-orange/80 hover:cursor-w-resize"
          @click="slider.prev()"
        >
          <span class="sr-only">Previous</span>

          <IconArrowLarge class="[@media(hover:hover)]:hidden w-[16px] h-[18px] rotate-90" />
        </button>

        <button
          v-if="slider"
          class="grow w-1/2 flex items-center justify-end p-[var(--app-outer-gutter)] hover:bg-orange/80 hover:cursor-e-resize"
          @click="slider.next()"
        >
          <span class="sr-only">Next</span>

          <IconArrowLarge class="[@media(hover:hover)]:hidden w-[16px] h-[18px] -rotate-90" />
        </button>
      </div>
    </div>
  </div>
</template>
