<script lang="ts" setup>
import type { SbVueRichTextProps, SbVueRichTextRenderContext } from '@storyblok/vue'

interface Props {
  type: 'link'
  attrs?: SbVueRichTextProps['link']['attrs']
  // eslint-disable-next-line vue/prop-name-casing
  _key?: string
  context?: SbVueRichTextRenderContext
}

defineOptions({ inheritAttrs: false })

const { attrs } = defineProps<Props>()

const to = computed(() => {
  const { href, linktype } = attrs ?? {}

  if (linktype === 'email') {
    return `mailto:${href}`
  }

  if (linktype === 'story') {
    return storyblokSlug(href ?? '')
  }

  return href ?? undefined
})
</script>

<template>
  <NuxtLink
    :to="to"
    :target="attrs?.target || undefined"
  >
    <slot />
  </NuxtLink>
</template>
