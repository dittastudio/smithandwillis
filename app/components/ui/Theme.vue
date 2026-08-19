<script lang="ts" setup>
interface Props {
  tag?: string
  theme?: 'light' | 'dark'
  id?: string
}

const { tag = 'section', theme, id } = defineProps<Props>()

const sharedTheme = useState<'light' | 'dark'>('theme', () => 'dark')
const el = useTemplateRef<HTMLElement>('el')

onMounted(() => {
  if (!theme || !el.value) {
    return
  }

  const offset = 50
  const rootMargin = `-${offset}px 0px -${window.innerHeight - offset - 1}px 0px`

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        sharedTheme.value = theme
      }
    },
    { rootMargin, threshold: 0 },
  )
  observer.observe(el.value)

  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <component
    :is="tag"
    :id="id"
    ref="el"
  >
    <slot />
  </component>
</template>
