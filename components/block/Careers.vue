<script lang="ts" setup>
import type { BlockCareersStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockCareersStoryblok
}

const { block } = defineProps<Props>()

const classesLinkHover = 'transition-opacity duration-300 ease-out opacity-100 hover:opacity-70'
</script>

<template>
  <div
    v-editable="block"
    class="block-careers wrapper flex flex-col gap-8 md:gap-10"
  >
    <h2
      v-if="block.headline"
      class="type-sans-large-caps text-balance"
    >
      {{ block.headline }}
    </h2>

    <ul
      class="grid grid-cols-1 md:grid-cols-2 gap-x-[var(--app-inner-gutter)] gap-y-4"
    >
      <li
        v-for="item in block.items"
        :key="item._uid"
        class="flex justify-between items-center gap-y-0.5 border-b border-current/20 pb-2"
      >
        <div>
          <p class="type-sans-medium">
            {{ item.role }}
          </p>

          <p class="type-sans-medium-caps">
            {{ item.company }}
          </p>
        </div>

        <div class="flex pr-3">
          <a
            :href="item.pdf.filename"
            target="_blank"
            rel="noopener noreferrer"
            class="type-mix-xsmall-caps p-3"
            :class="classesLinkHover"
          >
            View
          </a>

          <a
            :href="`mailto:${item.email}`"
            class="type-mix-xsmall-caps p-3"
            :class="classesLinkHover"
          >
            Apply
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>
