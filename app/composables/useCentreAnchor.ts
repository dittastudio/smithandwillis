export const useCentreAnchor = (target: Ref<HTMLElement | undefined>, offset: number = 0) => {
  const halfHeight = ref<number>(0)

  onMounted(async () => {
    await nextTick()
    if (target.value) {
      const { height } = target.value.getBoundingClientRect()
      halfHeight.value = Math.round(height / 2)
    }
  })

  const scrollMarginTop = computed(() => `scroll-margin-top: max(calc(50dvh - ${halfHeight.value}px), ${offset}px)`)

  return { scrollMarginTop }
}
