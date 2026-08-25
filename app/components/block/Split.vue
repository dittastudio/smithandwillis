<script lang="ts" setup>
import type { BlockSplit } from '#storyblok-components'
import IconMichelinStar from '@/assets/icons/michelin-star.svg'

interface Props {
  block: BlockSplit
}

const { block } = defineProps<Props>()

const scrollAnchor = useTemplateRef('scrollAnchor')
const { scrollMarginTop } = useCentreAnchor(scrollAnchor, 100)

const ratios = {
  mobile: {
    x: ratioDimensions(block.ratio_mobile || '').width,
    y: ratioDimensions(block.ratio_mobile || '').height,
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
    class="block-split flex items-center"
    :class="[
      block.reverse ? 'flex-col-reverse' : 'flex-col',
      block.reverse_desktop ? 'md:flex-row-reverse' : 'md:flex-row',
    ]"
  >
    <div class="w-full md:w-1/2 md:self-stretch md:*:h-full bg-offblack">
      <template
        v-if="block.content?.[0]"
      >
        <MediaImageResponsive
          v-if="block.content[0].component === 'split_media' && block.content[0]?.media"
          :asset="block.content[0].media"
          :desktop-asset="block.content[0].media"
          :ratio="block.ratio_mobile"
          :desktop-ratio="block.ratio_desktop"
          sizes="
            2xs:100vw
            xs:100vw
            sm:100vw
          "
          desktop-sizes="
            md:50vw
            lg:50vw
          "
        />

        <UiCarouselFade
          v-else-if="block.content[0].component === 'split_carousel'"
          class="text-white"
          :options="{
            autoplay: block.content[0].autoplay || false,
            autoplayDuration: Number(block.content[0].autoplay_duration),
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
            <picture v-if="isImageComponent(slide) && slide.image_desktop.filename">
              <MediaSource
                :media="getMediaQuery('md')"
                :width="ratios.desktop.x"
                :height="ratios.desktop.y"
                :src="slide.image_desktop.filename"
                sizes="sm:100vw md:100vw lg:100vw"
              />

              <MediaSource
                v-if="slide.image_mobile?.filename || slide.image_desktop?.filename"
                :width="ratios.mobile.x"
                :height="ratios.mobile.y"
                :src="slide.image_mobile?.filename || slide.image_desktop.filename"
                sizes="2xs:100vw xs:100vw sm:100vw"
              />

              <NuxtImg
                srcset=""
                class="size-full object-cover"
                :src="slide.image_desktop.filename"
                :alt="slide.image_mobile?.alt || slide.image_desktop.alt || 'Smith & Willis'"
                loading="lazy"
              />
            </picture>
          </template>
        </UiCarouselFade>
      </template>
    </div>

    <div
      :id="block.anchor_id ? safeKebabCase(block.anchor_id) : undefined"
      ref="scrollAnchor"
      :style="scrollMarginTop"
      class="
        w-full
        flex
        flex-col
        items-start
        gap-8
        px-(--app-outer-gutter)
        md:w-1/2
        md:gap-10
        md:py-(--app-outer-gutter)
        2xl:w-auto
        2xl:mx-auto
        max-md:border-b
        max-md:border-warm-grey/20
      "
      :class="{
        'md:pl-[calc(var(--app-outer-gutter)+(--spacing(4)))] 2xl:pr-[calc(var(--app-outer-gutter)+(--spacing(4)))]': !block.reverse_desktop,
        'pt-20 pb-12': block.reverse,
        'pb-20 pt-12': !block.reverse,
      }"
    >
      <h3
        v-if="block.headline"
        class="type-serif-large-caps text-balance inline-flex items-center gap-2"
      >
        <IconMichelinStar
          v-if="block.michelin_star"
          class="w-[1em] h-[1.125em]"
        />

        {{ block.headline }}
      </h3>

      <div
        v-if="storyblokRichTextContent(block.text)"
        class="
          prose
          prose-p:type-serif-large
          prose-p:max-w-[60ch]
          prose-p:text-pretty
        "
      >
        <StoryblokText :html="block.text" />
      </div>

      <StoryblokLink
        v-if="block.link?.cached_url"
        :item="block.link"
        class="type-serif-large p-4 -m-4 italic"
      >
        <UiTextLink :is-external="block.link.linktype !== 'story'">
          {{ block.link_title }}
        </UiTextLink>
      </StoryblokLink>
    </div>
  </div>
</template>
