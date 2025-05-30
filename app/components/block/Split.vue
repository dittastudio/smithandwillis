<script lang="ts" setup>
import type { BlockSplitStoryblok } from '@@/types/storyblok'
import IconMichelinStar from '@/assets/icons/michelin-star.svg'

interface Props {
  block: BlockSplitStoryblok
}

const { block } = defineProps<Props>()

const ratios = {
  mobile: {
    x: ratioDimensions(block.ratio || '').width,
    y: ratioDimensions(block.ratio || '').height,
  },
  desktop: {
    x: ratioDimensions(block.ratio_desktop || '').width,
    y: ratioDimensions(block.ratio_desktop || '').height,
  },
}
</script>

<template>
  <div
    v-editable="block"
    class="block-split flex flex-col-reverse items-center"
    :class="block.reverse ? 'md:flex-row-reverse' : 'md:flex-row'"
  >
    <div class="w-full md:w-1/2 md:self-stretch md:[&>*]:h-full">
      <template
        v-if="block.content?.[0]"
      >
        <MediaImageResponsive
          v-if="block.content[0].component === 'split_media' && block.content[0]?.media"
          :asset="block.content[0].media"
          :desktop-asset="block.content[0].media"
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

        <UiCarouselFade
          v-else-if="block.content[0].component === 'split_carousel'"
          class="text-white"
          :options="{
            autoplay: block.autoplay,
            navigation: true,
            pagination: true,
          }"
          :slides="block.content[0].slides || []"
          :ratio-x="ratios.mobile.x"
          :ratio-y="ratios.mobile.y"
          :ratio-desktop-x="ratios.desktop.x"
          :ratio-desktop-y="ratios.desktop.y"
        >
          <template #slide="{ slide }">
            <template v-if="slide.component === 'slide_images'">
              <SlideImages
                :block="slide"
                :ratio-x="ratios.mobile.x"
                :ratio-y="ratios.mobile.y"
                :ratio-desktop-x="ratios.desktop.x"
                :ratio-desktop-y="ratios.desktop.y"
              />
            </template>
          </template>
        </UiCarouselFade>
      </template>
    </div>

    <div
      class="w-full md:w-1/2 flex flex-col items-start gap-8 md:gap-10 pt-20 pb-12 px-[var(--app-outer-gutter)] md:py-[var(--app-outer-gutter)] 2xl:w-auto 2xl:mx-auto"
      :class="!block.reverse && 'md:pl-[calc(var(--app-outer-gutter)_+_--spacing(4))] 2xl:pr-[calc(var(--app-outer-gutter)_+_--spacing(4))]'"
    >
      <div class="flex items-center gap-2">
        <IconMichelinStar
          v-if="block.michelin_star"
          class="size-4.5"
        />

        <h3
          v-if="block.headline"
          class="type-sans-large-caps text-balance"
        >
          {{ block.headline }}
        </h3>
      </div>

      <div
        v-if="storyblokRichTextContent(block.text)"
        class="prose"
      >
        <StoryblokText :html="block.text" />
      </div>

      <template v-for="item in block.link">
        <StoryblokLink
          v-if="item.link.url"
          :key="item._uid"
          :item="item.link"
          class="p-4 -m-4 type-mix-small-caps"
        >
          <UiTextLink :is-external="item.link.linktype === 'url'">
            {{ item.title }}
          </UiTextLink>
        </StoryblokLink>
      </template>
    </div>
  </div>
</template>
