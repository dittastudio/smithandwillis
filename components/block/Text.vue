<script lang="ts" setup>
import type { BlockTextStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockTextStoryblok
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="block-text wrapper py-40 md:text-center flex flex-col gap-8 md:gap-10"
  >
    <h2
      v-if="block.headline"
      class="type-sans-large-caps text-balance"
    >
      {{ block.headline }}
    </h2>

    <div
      v-if="storyblokRichTextContent(block.text)"
      class="type-sans-large max-w-[60ch] md:mx-auto text-pretty"
    >
      <StoryblokText :html="block.text" />
    </div>

    <template
      v-for="item in block.link"
    >
      <StoryblokLink
        v-if="item"
        :key="item._uid"
        :item="item.link"
        class="type-mix-small-caps"
      >
        {{ item.title }}
      </StoryblokLink>
    </template>
  </div>
</template>
