<script lang="ts" setup>
import type { BlockTextStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockTextStoryblok // TODO: add RichText stuff
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

    <p class="type-sans-large max-w-[60ch] md:mx-auto text-pretty">
      <strong class="font-mix tracking-sm">I’ve always wanted to cook in a restaurant</strong> that felt like home. One of my fondest memories is of making tortelli with my aunt in Campania
    </p>

    <template
      v-for="link in block.link"
    >
      <StoryblokLink
        v-if="link"
        :key="link._uid"
        :item="link"
        class="type-mix-small-caps"
      >
        {{ link.title }}
      </StoryblokLink>
    </template>
  </div>
</template>
