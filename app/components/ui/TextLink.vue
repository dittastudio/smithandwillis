<script lang="ts" setup>
import IconArrowExternal from '@/assets/icons/arrow-external.svg'
import IconChevronRight from '@/assets/icons/chevron-right.svg'

interface Props {
  isExternal: boolean
  as?: 'span' | 'div'
}

const { isExternal, as = 'span' } = defineProps<Props>()
</script>

<template>
  <component
    :is="as || 'span'"
    class="
      inline-flex
      items-center
      gap-2
      in-[a]:transition-opacity
      in-[a]:duration-300
      in-[a]:ease-out
      [a:hover_&]:opacity-70
    "
  >
    <slot />

    <IconArrowExternal
      v-if="isExternal"
      class="
        size-2.5
        in-[a]:transition-transform
        in-[a]:duration-300
        in-[a]:ease-out
        [a:hover_&]:translate-x-0.5
        [a:hover_&]:-translate-y-0.5
      "
    />

    <IconChevronRight
      v-else
      class="
        w-1.75
        h-3
        in-[a]:transition-transform
        in-[a]:duration-300
        in-[a]:ease-out
        [a:hover_&]:translate-x-0.5
      "
    />
  </component>
</template>
