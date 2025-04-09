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
const cursorPosition = ref({ x: 0, y: 0 })
const isHovering = ref(false)
const hoveredButton = ref<'left' | 'right' | null>(null)
const rafId = ref<number | null>(null)
const supportsHover = ref(false)

onMounted(() => {
  supportsHover.value = window.matchMedia('(hover: hover)').matches
})

const updateCursorPosition = (x: number, y: number) => {
  if (!supportsHover.value)
    return
  cursorPosition.value = { x, y }
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isHovering.value || !supportsHover.value)
    return

  if (rafId.value) {
    cancelAnimationFrame(rafId.value)
  }

  rafId.value = requestAnimationFrame(() => {
    updateCursorPosition(e.clientX, e.clientY)
  })
}

const handleMouseEnter = (button: 'left' | 'right') => {
  if (!supportsHover.value)
    return
  isHovering.value = true
  hoveredButton.value = button
}

const handleMouseLeave = () => {
  if (!supportsHover.value)
    return
  isHovering.value = false
  hoveredButton.value = null
  if (rafId.value) {
    cancelAnimationFrame(rafId.value)
    rafId.value = null
  }
}

onUnmounted(() => {
  if (rafId.value) {
    cancelAnimationFrame(rafId.value)
  }
})

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
    class="block-carousel text-white"
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

      <div class="absolute inset-0 flex items-end justify-start p-[var(--app-outer-gutter)] z-2 pointer-events-none">
        <p class="type-sans-medium-caps pointer-events-auto">
          Title goes here
        </p>
      </div>

      <!-- Navigation Buttons -->
      <div class="absolute inset-0 flex">
        <button
          v-if="slider"
          class="w-1/2 flex items-center justify-start p-[var(--app-outer-gutter)] cursor-none touch-none"
          @click="slider.prev()"
          @mousemove.passive="handleMouseMove"
          @mouseenter="handleMouseEnter('left')"
          @mouseleave="handleMouseLeave"
        >
          <span class="sr-only">Previous</span>

          <IconArrowLarge class="[@media(hover:hover)]:hidden w-[16px] h-[18px] rotate-90" />
        </button>

        <button
          v-if="slider"
          class="w-1/2 flex items-center justify-end p-[var(--app-outer-gutter)] cursor-none touch-none"
          @click="slider.next()"
          @mousemove.passive="handleMouseMove"
          @mouseenter="handleMouseEnter('right')"
          @mouseleave="handleMouseLeave"
        >
          <span class="sr-only">Next</span>

          <IconArrowLarge class="[@media(hover:hover)]:hidden w-[16px] h-[18px] -rotate-90" />
        </button>
      </div>

      <!-- Cursor Takeover -->
      <div
        v-if="isHovering"
        class="fixed pointer-events-none z-1 will-change-transform top-0 left-0 translate-x-[var(--carousel-cursor-x)] translate-y-[var(--carousel-cursor-y)] [@media(hover:none)]:hidden"
        :style="{
          '--carousel-cursor-x': `${cursorPosition.x}px`,
          '--carousel-cursor-y': `${cursorPosition.y}px`,
        }"
      >
        <IconArrowLarge
          class="block w-[16px] h-[18px] -translate-x-1/2 -translate-y-1/2"
          :class="hoveredButton === 'left' ? 'rotate-90' : '-rotate-90'"
        />
      </div>
    </div>
  </div>
</template>
