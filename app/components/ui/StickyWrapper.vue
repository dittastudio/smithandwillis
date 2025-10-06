<script lang="ts" setup>
import { throttle } from 'lodash-es'

const elRef = useTemplateRef('elRef')
const elHeight = ref(0)
const isShorter = ref(false)

const checkHeight = () => {
  if (!elRef.value) {
    return
  }

  isShorter.value = window.innerHeight > elHeight.value
}

const setHeight = (height: number) => {
  if (!elRef.value) {
    return
  }

  elHeight.value = height
  elRef.value.style.setProperty('--_block-height', `${height}px`)

  checkHeight()
}

const handleResize = throttle(checkHeight, 200)

onMounted(() => {
  const observedElement = elRef.value

  if (!observedElement) {
    return
  }

  const resizeObserver = new ResizeObserver(([entry]) => {
    if (!entry) {
      return
    }

    setHeight(entry.target.clientHeight)
  })

  resizeObserver.observe(observedElement)
  window.addEventListener('resize', handleResize)

  setHeight(observedElement.clientHeight)
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
  bottom: calc((-1 * (var(--_block-height) + var(--app-header-height))) + 100vh);

  &.is-shorter {
    bottom: 0;
  }
}
</style>
