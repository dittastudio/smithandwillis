<script lang="ts" setup>
import type { SlideImages, SlideSplit, SlideVideo } from '@@/.storyblok/types/332344/storyblok-components'
import type { KeenSliderInstance } from 'keen-slider'
import type { Colours } from '@/utils/maps'
import { useIntersectionObserver } from '@vueuse/core'
import KeenSlider from 'keen-slider'
import IconArrowLarge from '@/assets/icons/arrow-large.svg'

interface Props {
  slides: (SlideSplit | SlideImages | SlideVideo)[]
  options?: {
    autoplay?: boolean
    navigation?: boolean
    pagination?: boolean
    slideClasses?: string
  }
  ratioX?: number
  ratioY?: number
  ratioDesktopX?: number
  ratioDesktopY?: number
}

const { slides, ratioX = 10, ratioY = 16, ratioDesktopX = 16, ratioDesktopY = 9, options = {
  autoplay: false,
  navigation: true,
  pagination: true,
  slideClasses: '',
} } = defineProps<Props>()

const slider = useTemplateRef<HTMLElement | null>('slider')
const sliderInstance = ref<KeenSliderInstance | null>(null)

const current = ref(0)
const opacities = ref<number[]>([])
const cursorPosition = ref({ x: 0, y: 0 })
const isHovering = ref(false)
const hoveredButton = ref<'left' | 'right' | null>(null)
const supportsHover = ref(false)
const isVisible = ref(false)
const isReady = ref(false)

const isSplitBlock = (block: SlideSplit | SlideImages | SlideVideo): block is SlideSplit => ['block_split'].includes(block.component)

const currentSlide = computed(() => slides[current.value])
const isSlideSplit = computed(() => currentSlide.value?.component === 'slide_split')
const hasReverseSlide = computed(() => {
  if (!currentSlide.value || !isSplitBlock(currentSlide.value)) {
    return false
  }

  return currentSlide.value?.reverse === true
})

const getTextColorClass = (slide?: SlideSplit | SlideImages | SlideVideo) => {
  if (!slide || !isSplitBlock(slide)) {
    return 'md:text-offblack'
  }

  const textColor = slide.text_color as Colours
  return textColor ? colourTextMd[textColor] : 'md:text-offblack'
}

const textColorClass = computed(() =>
  isSlideSplit.value && hasReverseSlide.value ? getTextColorClass(currentSlide.value) : '',
)

const paginationColorClass = computed(() =>
  isSlideSplit.value && !hasReverseSlide.value ? getTextColorClass(currentSlide.value) : '',
)

const arrowColorClass = computed(() => {
  if (!isSlideSplit.value) {
    return ''
  }

  const shouldApplyColor
    = (hasReverseSlide.value && hoveredButton.value === 'left')
      || (!hasReverseSlide.value && hoveredButton.value === 'right')

  return shouldApplyColor ? getTextColorClass(currentSlide.value) : ''
})

const updateCursorPosition = (x: number, y: number) => {
  if (!supportsHover.value) {
    return
  }

  cursorPosition.value = { x, y }
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isHovering.value || !supportsHover.value) {
    return
  }

  const rect = slider.value?.getBoundingClientRect()

  if (rect) {
    updateCursorPosition(e.clientX - rect.left, e.clientY - rect.top)
  }
}

const handleMouseEnter = (button: 'left' | 'right') => {
  if (!supportsHover.value) {
    return
  }

  isHovering.value = true
  hoveredButton.value = button
}

const handleMouseLeave = () => {
  if (!supportsHover.value) {
    return
  }

  isHovering.value = false
  hoveredButton.value = null
}

const handleChange = (direction: 'prev' | 'next') => {
  if (!sliderInstance.value) {
    return
  }

  sliderInstance.value[direction]()
}

const depressed = ref(false)

const handleMouseDown = () => {
  depressed.value = true
}

const handleMouseUp = () => {
  depressed.value = false
}

onMounted(() => {
  isReady.value = true
  supportsHover.value = window.matchMedia('(hover: hover)').matches

  const easing = (x: number): number => (x < 0.5 ? 8 * x ** 4 : 1 - (-2 * x + 2) ** 4 / 2)

  if (slider.value) {
    sliderInstance.value = new KeenSlider(slider.value, {
      initial: current.value,
      loop: true,
      slides: slides?.length || 0,
      defaultAnimation: {
        duration: 1500,
        easing,
      },
      slideChanged(slider) {
        current.value = slider.track.details.rel
      },
      detailsChanged: (slider) => {
        opacities.value = slider.track.details.slides.map((s: any) => s.portion)
      },
    })

    // Autoplay logic
    let timeout: ReturnType<typeof setTimeout> | null = null

    const nextTimeout = () => {
      if (!options?.autoplay || !isVisible.value) {
        return
      }

      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
        sliderInstance.value?.next()
      }, 3000)
    }

    const clearNextTimeout = () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }

    useIntersectionObserver(
      slider,
      ([target]) => {
        if (!target) {
          return
        }

        isVisible.value = target.isIntersecting
        isVisible.value ? nextTimeout() : clearNextTimeout()
      },
      { threshold: 0.5 },
    )

    sliderInstance.value.on('dragStarted', clearNextTimeout)
    sliderInstance.value.on('updated', nextTimeout)
    sliderInstance.value.on('animationEnded', nextTimeout)
  }
})

onUnmounted(() => {
  sliderInstance.value?.destroy()
})
</script>

<template>
  <div class="relative h-[inherit]">
    <div
      ref="slider"
      class="ui-carousel-fade__container relative w-full h-[inherit]"
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
        class="ui-carousel-fade__slide w-full select-none"
        :class="[
          options.slideClasses,
          opacities[index] === 1 ? 'pointer-events-auto' : 'pointer-events-none',
          { 'z-10': index === 0 && !isReady },
        ]"
        :style="{ opacity: opacities[index] }"
      >
        <slot
          name="slide"
          :slide="slide"
          :index="index"
        />
      </div>

      <!-- Navigation Buttons -->
      <div
        v-if="options.navigation"
        class="absolute inset-0 flex"
      >
        <button
          class="w-1/2 flex items-center justify-start p-[var(--app-outer-gutter)] cursor-none"
          @click="handleChange('prev')"
          @mousemove.passive="handleMouseMove"
          @mouseenter="handleMouseEnter('left')"
          @mouseleave="handleMouseLeave"
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
        >
          <span class="sr-only">Previous</span>

          <IconArrowLarge
            class="[@media(hover:hover)]:hidden w-[16px] h-[18px] rotate-90 drop-shadow-sm"
          />
        </button>

        <button
          class="ui-carousel-fade__button ui-carousel-fade__button--right w-1/2 flex items-center justify-end p-[var(--app-outer-gutter)] cursor-none"
          @click="handleChange('next')"
          @mousemove.passive="handleMouseMove"
          @mouseenter="handleMouseEnter('right')"
          @mouseleave="handleMouseLeave"
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
        >
          <span class="sr-only">Next</span>

          <IconArrowLarge
            class="[@media(hover:hover)]:hidden w-[16px] h-[18px] -rotate-90 drop-shadow-sm"
          />
        </button>
      </div>

      <!-- Cursor Takeover -->
      <div
        v-if="isHovering"
        class="
          absolute
          pointer-events-none
          z-1
          will-change-transform
          top-0
          left-0
          translate-x-[calc(var(--carousel-cursor-x)_-_50%)]
          translate-y-[calc(var(--carousel-cursor-y)_-_50%)]
          [@media(hover:none)]:hidden
          text-white
          drop-shadow-sm
        "
        :style="{
          '--carousel-cursor-x': `${cursorPosition.x}px`,
          '--carousel-cursor-y': `${cursorPosition.y}px`,
        }"
      >
        <IconArrowLarge
          class="block w-[16px] h-[18px] transition-all duration-300 ease-out"
          :class="[
            hoveredButton === 'left' ? 'rotate-90' : '-rotate-90',
            arrowColorClass,
            {
              'text-white/60': depressed,
              '-translate-x-1/4': depressed && hoveredButton === 'left',
              'translate-x-1/4': depressed && hoveredButton === 'right',
            },
          ]"
        />
      </div>
    </div>

    <div
      class="absolute inset-0 pointer-events-none flex flex-col justify-end contain-paint contain-layout"
    >
      <div class="sticky bottom-0 flex items-start justify-between wrapper">
        <p
          v-if="$slots.caption"
          class="ui-carousel-fade__gradient ui-carousel-fade__gradient--left py-[var(--app-outer-gutter)] type-sans-medium-caps transition-colors duration-300 ease-out"
          :class="[
            hasReverseSlide && 'ui-carousel-fade__gradient--hide',
            textColorClass,
          ]"
        >
          <span class="block pointer-events-auto">
            <slot name="caption" />
          </span>
        </p>

        <div
          v-if="options.pagination"
          class="ui-carousel-fade__gradient ui-carousel-fade__gradient--right py-[var(--app-outer-gutter)] type-sans-medium-caps transition-colors duration-300 ease-out ml-auto"
          :class="[
            isSlideSplit && !hasReverseSlide ? 'ui-carousel-fade__gradient--hide' : '',
            paginationColorClass,
          ]"
        >
          {{ current + 1 }} / {{ slides.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

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

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    height: 300%;
    opacity: 0.8;
    background-image: radial-gradient(ellipse at 52.5% 100%, --alpha(var(--color-black) / 100%) 0%, --alpha(var(--color-black) / 0%) 60%);
    z-index: -1;
    pointer-events: none;
    transition: opacity 0.3s var(--ease-out);
  }
}

.ui-carousel-fade__gradient--left {
  &::before {
    left: calc(-12 * var(--app-outer-gutter));
    right: -25vw;
  }
}

.ui-carousel-fade__gradient--right {
  &::before {
    left: -25vw;
    right: calc(-12 * var(--app-outer-gutter));
  }
}

.ui-carousel-fade__gradient--hide {
  @variant md {
    &::before {
      opacity: 0;
    }
  }
}
</style>
