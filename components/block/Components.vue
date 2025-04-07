<script lang="ts" setup>
import type { PageStoryblok } from '@/types/storyblok'

interface Props {
  content: PageStoryblok
}

const { content } = defineProps<Props>()

console.log(content)
</script>

<template>
  <div class="-mt-[var(--header-height)]">
    <section
      v-for="hero in content.hero"
      :key="hero._uid"
    >
      <BlockHero
        v-if="hero.component === 'hero_media'"
        :block="hero"
      />
    </section>

    <section
      v-for="block in content.blocks"
      :key="block._uid"
    >
      <BlockMedia
        v-if="block.component === 'block_media'"
        :block="block"
      />

      <BlockText
        v-else-if="block.component === 'block_text'"
        :block="block"
      />

      <!-- <Screen :log="block" /> -->
    </section>
  </div>
</template>
