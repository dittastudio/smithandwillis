<script lang="ts" setup>
import type { BlockSplitStoryblok } from '@/types/storyblok'

interface Props {
  block: BlockSplitStoryblok
}

const { block } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <div
    v-editable="block"
    class="block-split flex flex-col-reverse items-center"
    :class="block.reverse ? 'md:flex-row-reverse' : 'md:flex-row'"
  >
    <div class="w-full md:w-1/2 md:self-stretch md:[&>*]:h-full">
      <MediaImageResponsive
        v-if="block.media && assetType === 'image'"
        :asset="block.media"
        :desktop-asset="block.media"
        :ratio="block.ratio"
        :desktop-ratio="block.ratio_desktop"
        sizes="
          2xs:100vw
          xs:100vw
          sm:100vw
          md:100vw
        "
        desktop-sizes="
          md:50vw
          lg:50vw
          xl:50vw
          2xl:50vw
        "
      />
    </div>

    <div
      class="w-full md:w-1/2 flex flex-col items-start gap-8 md:gap-10 pt-20 pb-12 px-[var(--app-outer-gutter)] md:py-[var(--app-outer-gutter)] 2xl:w-auto 2xl:mx-auto"
      :class="!block.reverse && 'md:pl-[calc(var(--app-outer-gutter)_+_--spacing(4))] 2xl:pr-[calc(var(--app-outer-gutter)_+_--spacing(4))]'"
    >
      <h3
        v-if="block.headline"
        class="type-sans-large-caps text-balance"
      >
        {{ block.headline }}
      </h3>

      <div
        v-if="storyblokRichTextContent(block.text)"
        class="prose"
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
          <UiTextLink :is-external="item.link.linktype === 'url'">
            {{ item.title }}
          </UiTextLink>
        </StoryblokLink>
      </template>
    </div>
  </div>
</template>
