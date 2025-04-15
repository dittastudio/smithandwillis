<script lang="ts" setup>
const container = ref<HTMLElement | null>(null)
let rafId: number | null = null
let lastScrollY = 0

const handleScroll = () => {
  if (!container.value)
    return

  // Cancel any existing animation frame
  if (rafId) {
    cancelAnimationFrame(rafId)
  }

  // Use requestAnimationFrame for smooth animation
  rafId = requestAnimationFrame(() => {
    const currentScrollY = window.scrollY
    const viewportHeight = window.innerHeight
    // Calculate percentage based on viewport height
    const percentage = (currentScrollY / viewportHeight) * 100

    // Only update if scroll position has changed
    if (currentScrollY !== lastScrollY) {
      container.value!.style.transform = `translate3d(0, ${percentage * 0.25}%, 0)`
      lastScrollY = currentScrollY
    }
  })
}

onMounted(() => {
  if (!container.value)
    return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll, { passive: true })
        }
        else {
          window.removeEventListener('scroll', handleScroll)
          // Reset transform when out of view
          if (container.value) {
            container.value.style.transform = 'translate3d(0, 0, 0)'
          }
        }
      })
    },
    { threshold: 0 },
  )

  observer.observe(container.value)
})

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
    class="h-[inherit] will-change-transform backface-visibility-hidden transform-style-preserve-3d"
  >
    <slot />
  </div>
</template>
