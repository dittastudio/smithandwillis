<script lang="ts" setup>
import type { StoryblokMultilink } from '#storyblok-types'

interface Props {
  item: StoryblokMultilink
}

const { item } = defineProps<Props>()

const href = determineHref(item)

const attributes = {
  title: item?.title,
  rel: item?.rel,
  to: `${href?.trim().replace(/\/+$/, '')}${item?.anchor ? `#${item?.anchor}` : ''}`,
  target: item?.target ?? item?.linktype === 'asset' ? '_blank' : null,
}
</script>

<template>
  <NuxtLink v-bind="attributes">
    <slot />
  </NuxtLink>
</template>
