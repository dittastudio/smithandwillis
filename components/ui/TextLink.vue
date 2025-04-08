<script setup lang="ts">
import IconArrowRight from '@/assets/icons/arrow-right-sm.svg'
import IconArrowTopRight from '@/assets/icons/arrow-top-right.svg'

interface Props {
  isExternal: boolean
}

const { isExternal } = defineProps<Props>()
</script>

<template>
  <span
    class="
      inline-flex
      items-center
      gap-2
      [a_&]:transition-opacity
      [a_&]:duration-300
      [a_&]:ease-out
      [a:hover_&]:opacity-70
    "
  >
    <slot />

    <IconArrowTopRight
      v-if="isExternal"
      class="
        size-2.5
        [a_&]:transition-transform
        [a_&]:duration-300
        [a_&]:ease-out
        [a:hover_&]:translate-x-0.5
        [a:hover_&]:-translate-y-0.5
      "
    />

    <IconArrowRight
      v-else
      class="
        w-1.75
        h-3
        [a_&]:transition-transform
        [a_&]:duration-300
        [a_&]:ease-out
        [a:hover_&]:translate-x-0.5
      "
    />
  </span>
</template>
