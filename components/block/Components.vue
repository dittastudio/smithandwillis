<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

interface Props {
  content: PageStoryblok
}

const { content } = defineProps<Props>()
</script>

<template>
  <div class="-mt-[var(--header-height)]">
    <section
      v-for="block in content.blocks"
      :key="block._uid"
    >
      <BlockMedia
        v-if="block.component === 'block_media'"
        :block="block"
      />

      <pre>{{ block }}</pre>
    </section>
  </div>
</template>
