<script lang="ts" setup>
// import type { BlockCareersStoryblok } from '@/types/storyblok'

interface Props {
  block: any
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="block-text wrapper py-40 flex flex-col gap-8 md:gap-10"
  >
    <h2
      class="type-sans-large-caps text-balance"
    >
      title
    </h2>

    <div
      class=""
    >
      List
    </div>
  </div>
</template>
