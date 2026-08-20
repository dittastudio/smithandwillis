<script generic="T" lang="ts" setup>
import type { KeenSliderInstance, KeenSliderOptions, TrackDetails } from 'keen-slider'
import type { AutoplayControls } from '@/utils/carousels'
import { onKeyStroke, useIntersectionObserver } from '@vueuse/core'
import { useKeenSlider } from 'keen-slider/vue.es'
import { getCarouselAutoplayPlugin, getCarouselSwipeControlsPlugin } from '@/utils/carousels'

export interface Carousel {
  slider: Ref<KeenSliderInstance | undefined>
  details: Ref<TrackDetails | undefined>
  next: () => void
  previous: () => void
}

interface Props<T> {
  items?: T[]
  options?: KeenSliderOptions
  autoplay?: boolean
  autoplayInterval?: number
}

const {
  items,
  options = {},
  autoplay = false,
  autoplayInterval = 5000,
} = defineProps<Props<T>>()

const details = ref<TrackDetails>()
const isInView = ref(false)
const opacities = ref<number[]>([])

const enabled = computed(() => items && items.length >= 2)
const isAutoplayActive = computed(() => autoplay && isInView.value)

const autoplayControls: AutoplayControls = {
  start: () => {},
  stop: () => {},
}

const [container, slider] = useKeenSlider({
  loop: false,
  mode: 'snap',
  disabled: !enabled.value,
  defaultAnimation: {
    duration: 500,
  },
  slides: items?.length || 0,
  detailsChanged: (slider) => {
    type Slide = TrackDetails['slides'][number]
    opacities.value = slider.track.details.slides.map((s: Slide) => s.portion)
  },
  created(slider) {
    details.value = slider.track.details

    slider.on('detailsChanged', (s) => {
      details.value = s.track.details
    })
  },
  ...options,
}, [
  enabled.value ? getCarouselSwipeControlsPlugin() : () => {},
  enabled.value
    ? getCarouselAutoplayPlugin({
        isActive: () => isAutoplayActive.value,
        interval: () => autoplayInterval,
        controls: autoplayControls,
      })
    : () => {},
])

const next = () => {
  slider.value?.next()
}

const previous = () => {
  slider.value?.prev()
}

defineExpose({ slider, details, next, previous })

useIntersectionObserver(
  container,
  ([entry]) => {
    if (entry) {
      isInView.value = entry.isIntersecting
    }
  },
  {
    threshold: 0,
  },
)

watch(isAutoplayActive, (active) => {
  if (active) {
    autoplayControls.start()
    return
  }

  autoplayControls.stop()
})

onKeyStroke('ArrowLeft', (e: KeyboardEvent) => {
  if (isInView.value) {
    e.preventDefault()
    previous()
  }
})

onKeyStroke('ArrowRight', (e: KeyboardEvent) => {
  if (isInView.value) {
    e.preventDefault()
    next()
  }
})
</script>

<template>
  <div class="relative w-full h-[inherit]">
    <div
      ref="container"
      class="ui-carousel__slider relative w-full h-[inherit] flex touch-pan-y select-none overflow-hidden"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="ui-carousel__slide shrink-0 w-full"
        :class="[
          opacities[index] === 1 ? 'pointer-events-auto' : 'pointer-events-none',
        ]"
        :style="{ opacity: opacities[index] }"
      >
        <slot
          name="item"
          :item="item"
          :index="index"
          :is-active="details?.rel === index"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/app.css";

.ui-carousel__slider {
  display: grid;
  grid-template-areas: "stack";
}

.ui-carousel__slide {
  grid-area: stack;
}
</style>
