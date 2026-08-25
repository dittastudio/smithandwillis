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
      inline-block
      text-pretty
      in-[a]:transition-opacity
      in-[a]:duration-300
      in-[a]:ease-out
      [a:hover_&]:opacity-70
    "
  >
    <span class="inline mr-2 *:inline">
      <slot />
    </span>

    <IconArrowExternal
      v-if="isExternal"
      class="
        inline
        align-baseline
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
        inline
        align-baseline
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
