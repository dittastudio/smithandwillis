<script lang="ts" setup>
import type {
  BlockCareers,
  BlockCarousel,
  BlockHero,
  BlockMediaGrid,
  BlockSplit,
  BlockText,
} from '#storyblok-components'

type Blocks = BlockCareers
  | BlockCarousel
  | BlockHero
  | BlockMediaGrid
  | BlockSplit
  | BlockText

interface Props {
  tag?: string
  block: Blocks
  id?: string
}

const { tag = 'section', block, id } = defineProps<Props>()

const sharedTheme = useState<'light' | 'dark'>('theme', () => 'light')
const el = useTemplateRef<HTMLElement>('el')

onMounted(() => {
  if (!block.header_color || !el.value) {
    return
  }

  const offset = 50
  const rootMargin = `-${offset}px 0px -${window.innerHeight - offset - 1}px 0px`

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        sharedTheme.value = block.header_color as 'light' | 'dark'
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
