<script lang="ts" setup>
import type { BlockCarouselStoryblok } from '@/types/storyblok'
import IconArrowLarge from '@/assets/icons/arrow-large.svg'

import { useKeenSlider } from 'keen-slider/vue.es'
import 'keen-slider/keen-slider.min.css'

interface Props {
  block: BlockCarouselStoryblok
}

const { block } = defineProps<Props>()

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

const easing = (x: number): number => {
  return x < 0.5 ? 8 * x * x * x * x : 1 - (-2 * x + 2) ** 4 / 2
}

const [container, slider] = useKeenSlider({
  initial: current.value,
  slides: block.slides?.length || 0,
  loop: true,
  defaultAnimation: {
    duration: 1000,
    easing,
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
    class="block-carousel relative text-white"
  >
    <div
      ref="container"
      class="relative overflow-hidden w-full aspect-[10/16] md:aspect-[16/9]"
    >
      <div
        v-for="(slide, index) in block.slides"
        :key="index"
        class="w-full h-full absolute inset-0"
        :style="{ opacity: opacities[index] }"
      >
        <!-- <pre>{{ slide }}</pre> -->

        <template v-if="slide.component === 'slide_image'">
          <div class="flex flex-col md:flex-row h-full">
            <template
              v-for="image in slide.images"
              :key="image.id"
            >
              <MediaImageResponsive
                :asset="image"
                :desktop-asset="image"
                :ratio="`10:${16 / (slide.images?.length || 1)}`"
                :desktop-ratio="`${16 / (slide.images?.length || 1)}:9`"
                sizes="100vw sm:100vw md:100vw"
                desktop-sizes="md:100vw lg:100vw xl:100vw 2xl:100vw"
              />
            </template>
          </div>
        </template>
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

    <div class="absolute inset-0 z-2 pointer-events-none flex flex-col justify-end contain-paint contain-layout">
      <div class="block-carousel__gradient sticky bottom-0 py-[var(--app-outer-gutter)]">
        <p class="wrapper type-sans-medium-caps pointer-events-auto">
          {{ block.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<style>
@reference "../../assets/css/main.css";

.block-carousel__gradient {
  &::before {
    --block-carousel-gradient-color: var(--color-black);

    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200%;
    opacity: 0.7;
    background-image:
      linear-gradient(
        to top,
        --alpha(var(--block-carousel-gradient-color) / 100%) 0%,
        --alpha(var(--block-carousel-gradient-color) / 98.7%) 8.1%,
        --alpha(var(--block-carousel-gradient-color) / 95.1%) 15.5%,
        --alpha(var(--block-carousel-gradient-color) / 89.6%) 22.5%,
        --alpha(var(--block-carousel-gradient-color) / 82.5%) 29%,
        --alpha(var(--block-carousel-gradient-color) / 74.1%) 35.3%,
        --alpha(var(--block-carousel-gradient-color) / 64.8%) 41.2%,
        --alpha(var(--block-carousel-gradient-color) / 55%) 47.1%,
        --alpha(var(--block-carousel-gradient-color) / 45%) 52.9%,
        --alpha(var(--block-carousel-gradient-color) / 35.2%) 58.8%,
        --alpha(var(--block-carousel-gradient-color) / 25.9%) 64.7%,
        --alpha(var(--block-carousel-gradient-color) / 17.5%) 71%,
        --alpha(var(--block-carousel-gradient-color) / 10.4%) 77.5%,
        --alpha(var(--block-carousel-gradient-color) / 4.9%) 84.5%,
        --alpha(var(--block-carousel-gradient-color) / 1.3%) 91.9%,
        --alpha(var(--block-carousel-gradient-color) / 0%) 100%
      )
    ;
    z-index: -1;
    transition: opacity 1s var(--ease-out);
    pointer-events: none;
  }
}
</style>
