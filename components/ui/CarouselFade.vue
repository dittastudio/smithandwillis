<script lang="ts" setup>
import IconArrowLarge from '@/assets/icons/arrow-large.svg'

import { useKeenSlider } from 'keen-slider/vue.es'
import 'keen-slider/keen-slider.min.css'

interface Props {
  slides: any[]
  caption?: string
  ratioX?: number
  ratioY?: number
  ratioDesktopX?: number
  ratioDesktopY?: number
}

const { slides, caption, ratioX = 10, ratioY = 16, ratioDesktopX = 16, ratioDesktopY = 9 } = defineProps<Props>()

const current = ref(0)
const opacities = ref<number[]>([])
const cursorPosition = ref({ x: 0, y: 0 })
const isHovering = ref(false)
const hoveredButton = ref<'left' | 'right' | null>(null)
const rafId = ref<number | null>(null)
const supportsHover = ref(false)

const currentSlide = computed(() => slides[current.value])

const hasReverseSlide = computed(() => currentSlide.value?.reverse === true)

const textColorClass = computed(() =>
  hasReverseSlide.value
    ? (currentSlide.value?.text_color ? colourTextMd[currentSlide.value.text_color] : 'md:text-offblack')
    : '',
)

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
  slides: slides?.length || 0,
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
  <div class="relative text-white">
    <div
      ref="container"
      class="ui-carousel-fade__container relative w-full"
      :style="{
        '--carousel-ratio-x': ratioX,
        '--carousel-ratio-y': ratioY,
        '--carousel-ratio-x-desktop': ratioDesktopX,
        '--carousel-ratio-y-desktop': ratioDesktopY,
      }"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="ui-carousel-fade__slide w-full"
        :style="{ opacity: opacities[index] }"
      >
        <slot
          name="slide"
          :slide="slide"
        />
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

    <div
      v-if="caption"
      class="absolute inset-0 z-2 pointer-events-none flex flex-col justify-end contain-paint contain-layout"
    >
      <div class="sticky bottom-0 flex items-start justify-start wrapper">
        <p
          class="ui-carousel-fade__gradient py-[var(--app-outer-gutter)] type-sans-medium-caps pointer-events-auto"
          :class="[
            hasReverseSlide && 'ui-carousel-fade__gradient--reverse',
            textColorClass,
          ]"
        >
          {{ caption }}
        </p>
      </div>
    </div>
  </div>
</template>

<style>
@reference "../../assets/css/main.css";

.ui-carousel-fade__container {
  display: grid;
  grid-template-areas: "stack";
  aspect-ratio: var(--carousel-ratio-x) / var(--carousel-ratio-y);

  @variant md {
    aspect-ratio: var(--carousel-ratio-x-desktop) / var(--carousel-ratio-y-desktop);
  }
}

.ui-carousel-fade__slide {
  grid-area: stack;
}

.ui-carousel-fade__gradient {
  position: relative;
  transition: color 0.3s var(--ease-out);

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: calc(-12 * var(--app-outer-gutter));
    right: -25vw;
    height: 300%;
    opacity: 0.8;
    background-image: radial-gradient(ellipse at 52.5% 100%, --alpha(var(--color-black) / 100%) 0%, --alpha(var(--color-black) / 0%) 60%);
    z-index: -1;
    pointer-events: none;
    transition: opacity 0.3s var(--ease-out);
  }

  &--reverse {
    @variant md {
      &::before {
        opacity: 0;
      }
    }
  }
}
</style>
