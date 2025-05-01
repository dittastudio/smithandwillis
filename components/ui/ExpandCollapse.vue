<script lang="ts" setup>
interface Props {
  isOpen?: boolean
}

const { isOpen = false } = defineProps<Props>()

const inner = useTemplateRef<HTMLDivElement | null>('inner')
const height = ref<number>(0)
const resizeObserver = ref<ResizeObserver | undefined>(undefined)

const setHeightStyles = computed<{ height: string }>(() => ({
  height: isOpen && inner.value ? `${height.value}px` : '0px',
}))

onMounted(() => {
  resizeObserver.value = new window.ResizeObserver((entries) => {
    entries.forEach((entry) => {
      height.value = entry.contentRect.height
    })
  })

  if (inner.value) {
    height.value = inner.value.clientHeight
    resizeObserver.value.observe(inner.value)
  }
})

onUnmounted(() => {
  resizeObserver.value?.disconnect()
})
</script>

<template>
  <div
    class="contain-layout contain-paint transition-[height] duration-500 ease-inOutQuart"
    :style="setHeightStyles"
  >
    <div
      ref="inner"
      :class="{
        'opacity-0 transition-opacity duration-200 ease-out': !isOpen,
        'opacity-100 transition-opacity duration-400 ease-out delay-300': isOpen,
      }"
    >
      <slot />
    </div>
  </div>
</template>
