<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'

const container = ref<HTMLElement | null>(null)
let rafId: number | null = null
let lastScrollY = 0

const handleScroll = () => {
  if (!container.value)
    return

  if (rafId) {
    cancelAnimationFrame(rafId)
  }

  rafId = requestAnimationFrame(() => {
    const currentScrollY = window.scrollY
    const viewportHeight = window.innerHeight

    const percentage = (currentScrollY / viewportHeight) * 100

    if (currentScrollY !== lastScrollY) {
      container.value!.style.translate = `0 ${percentage * 0.25}% 0`
      lastScrollY = currentScrollY
    }
  })
}

useIntersectionObserver(
  container,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }
    else {
      window.removeEventListener('scroll', handleScroll)

      if (container.value) {
        container.value.style.translate = '0 0 0'
      }
    }
  },
  { threshold: 0 },
)

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (rafId) {
    cancelAnimationFrame(rafId)
  }
})
</script>

<template>
  <div
    ref="container"
    data-js-hero
    class="h-[inherit] will-change-[translate] backface-visibility-hidden transform-style-preserve-3d transition-transform duration-50 ease-out"
  >
    <slot />
  </div>
</template>
