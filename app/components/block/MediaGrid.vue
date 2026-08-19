<script lang="ts" setup>
import type { BlockMediaGrid } from '#storyblok-components'

interface Props {
  block: BlockMediaGrid
}

const { block } = defineProps<Props>()
</script>

<template>
  <div
    v-editable="block"
    class="block-text wrapper md:text-center flex flex-col items-start md:items-center gap-8 md:gap-10"
  >
    {{ block }}

    <!-- <template v-for="item in block.link">
      <StoryblokLink
        v-if="item.link.cached_url"
        :key="item._uid"
        :item="item.link"
        class="p-4 -m-4 type-serif-small-caps"
      >
        <UiTextLink :is-external="item.link.linktype === 'url'">
          {{ item.title }}
        </UiTextLink>
      </StoryblokLink>
    </template> -->
  </div>
</template>
