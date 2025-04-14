<script lang="ts" setup>
import { throttle } from 'lodash-es'

const elRef = ref<HTMLElement | null>(null)
const elHeight = ref(0)
const isShorter = ref(false)

const checkHeight = () => {
  if (elRef.value) {
    isShorter.value = window.innerHeight > elHeight.value
  }
}

const handleResize = throttle(checkHeight, 200)

onMounted(() => {
  const observedElement = elRef.value

  if (!observedElement)
    return

  const resizeObserver = new ResizeObserver(([entry]) => {
    elHeight.value = entry.target.clientHeight
    observedElement.style.setProperty('--_block-height', `${elHeight.value}px`)
  })

  resizeObserver.observe(observedElement)
  checkHeight()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div
    ref="elRef"
    class="ui-sticky-wrapper"
    :class="{ 'is-shorter': isShorter }"
  >
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.ui-sticky-wrapper {
  position: sticky;
  bottom: calc((-1 * var(--_block-height)) + 100vh);
  bottom: calc((-1 * var(--_block-height)) + 100svh);
  z-index: 0;

  &.is-shorter {
    bottom: 0;
  }
}
</style>
