<script lang="ts" setup>
import type { BlockImage } from '@@/.storyblok/types/332344/storyblok-components'
import IconMichelinStar from '@/assets/icons/michelin-star.svg'

interface Props {
  block: BlockImage
}

const { block } = defineProps<Props>()
const assetType = computed(() => storyblokAssetType(block.media?.filename || ''))
</script>

<template>
  <figure
    v-editable="block"
    class="relative"
  >
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
        md:100vw
        lg:100vw
        xl:100vw
        2xl:100vw
      "
    />

    <figcaption
      v-if="block.title || block.sub_title"
      class="absolute inset-0 flex flex-col items-start justify-end contain-layout contain-paint"
    >
      <div class="sticky bottom-0">
        <div class="block-image__gradient p-(--app-outer-gutter)">
          <StoryblokLink
            v-if="block.link?.cached_url"
            :item="block.link"
            class="p-(--app-outer-gutter) -m-(--app-outer-gutter) flex flex-col gap-1"
          >
            <UiTextLink :is-external="block.link.linktype === 'url'">
              <span class="type-sans-medium-caps flex items-center gap-2">
                <IconMichelinStar
                  v-if="block.michelin_star"
                  class="w-[1em] h-[1.125em]"
                />

                {{ block.title }}
              </span>
            </UiTextLink>

            <p class="type-mix-medium transition-opacity duration-300 ease-out [a:hover_&]:opacity-70 italic">
              {{ block.sub_title }}
            </p>
          </StoryblokLink>

          <div
            v-else
            class="flex flex-col gap-1"
          >
            <h4 class="type-sans-medium-caps flex items-center gap-2">
              <IconMichelinStar
                v-if="block.michelin_star"
                class="w-[1em] h-[1.125em]"
              />

              {{ block.title }}
            </h4>

            <p class="type-mix-medium italic">
              {{ block.sub_title }}
            </p>
          </div>
        </div>
      </div>
    </figcaption>
  </figure>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.block-image__gradient {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: calc(-1 * var(--app-outer-gutter));
    right: -50vw;
    bottom: 0;
    opacity: 0.5;
    height: 300%;
    background-image: radial-gradient(ellipse at 0% 100%, --alpha(var(--color-black) / 100%) 0%, --alpha(var(--color-black) / 0%) 60%);
    z-index: -1;
    pointer-events: none;
    transition: opacity 0.3s var(--ease-out);
  }
}
</style>
