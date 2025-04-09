<script lang="ts" setup>
// import type { BlockTextStoryblok } from '@/types/storyblok'
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
const opacities = ref<number[]>([])

const [container] = useKeenSlider({
  slides: images.length,
  loop: true,
  defaultAnimation: {
    duration: 3000,
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
      class="fader"
    >
      <div
        v-for="(src, index) in images"
        :key="index"
        class="fader__slide"
        :style="{ opacity: opacities[index] }"
      >
        <img :src="src">
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.fader {
  width: 100%;
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
}

.fader__slide {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}

.fader img {
  width: 100%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
</style>
