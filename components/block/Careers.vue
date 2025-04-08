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
    class="block-careers wrapper flex flex-col gap-4 md:gap-6"
  >
    <h2
      v-if="block.headline"
      class="type-sans-large-caps text-balance"
    >
      {{ block.headline }}
    </h2>

    <ul
      class="group grid grid-cols-1 md:grid-cols-2 gap-x-[var(--app-inner-gutter)]"
    >
      <li
        v-for="item in block.items"
        :key="item._uid"
        class="
          flex
          justify-between
          items-center
          border-b
          border-current/20
          pt-4
          pb-2
          transition-opacity
          duration-300
          ease-out
          opacity-100
          group-hover:[&:not(&:hover)]:opacity-50
        "
      >
        <div class="flex flex-col gap-y-0.5">
          <p
            v-if="item.role"
            class="type-sans-medium"
          >
            {{ item.role }}
          </p>

          <p
            v-if="item.company"
            class="type-sans-medium-caps"
          >
            {{ item.company }}
          </p>
        </div>

        <div class="flex pr-3">
          <a
            v-if="item.pdf?.filename"
            :href="item.pdf.filename"
            target="_blank"
            rel="noopener noreferrer"
            class="type-mix-xsmall-caps p-3"
            :class="classesLinkHover"
          >
            View
          </a>

          <a
            v-if="item.email"
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
