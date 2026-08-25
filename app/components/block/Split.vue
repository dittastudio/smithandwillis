<script lang="ts" setup>
import type { BlockSplit } from '#storyblok-components'
import IconMichelinStar from '@/assets/icons/michelin-star.svg'
import type { Carousel } from '@/components/ui/Carousel.vue'
import IconArrowLeft from '@/assets/icons/arrow-large-left.svg'
import IconArrowRight from '@/assets/icons/arrow-large-right.svg'


interface Props {
  block: BlockSplit
}

const { block } = defineProps<Props>()

const scrollAnchor = useTemplateRef('scrollAnchor')
const { scrollMarginTop } = useCentreAnchor(scrollAnchor, 100)

const ratioMobile = computed(() => ratioDimensions(block.ratio_mobile))
const ratioDesktop = computed(() => ratioDimensions(block.ratio_desktop))
const ratioMobileClass = computed(() => ratios[block.ratio_mobile] ?? '')
const ratioDesktopClass = computed(() => ratios[`md-${block.ratio_desktop}`] ?? '')

const carouselRef = useTemplateRef<Carousel>('carouselRef')

const previous = () => carouselRef.value?.previous()
const next = () => carouselRef.value?.next()
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
        <picture v-if="block.content[0].component === 'image' && block.content[0].image_desktop.filename">
          <MediaSource
            :media="getMediaQuery('md')"
            :width="ratioDesktop.width"
            :height="ratioDesktop.height"
            :src="block.content[0].image_desktop.filename"
            sizes="sm:50vw md:50vw lg:50vw"
          />

          <MediaSource
            :width="ratioMobile.width || ratioDesktop.width"
            :height="ratioMobile.height || ratioDesktop.height"
            :src="block.content[0].image_mobile?.filename || block.content[0].image_desktop.filename"
            sizes="2xs:100vw xs:100vw sm:100vw"
          />

          <NuxtImg
            srcset=""
            class="size-full object-cover"
            :src="block.content[0].image_desktop.filename"
            :alt="block.content[0].image_mobile?.alt || block.content[0].image_desktop.alt || 'Smith & Willis'"
            loading="lazy"
          />
        </picture>

        <div v-else-if="block.content[0].component === 'split_carousel'" class="relative overflow-hidden">
          <UiCarousel
            ref="carouselRef"
            :items="block.content[0].slides"
            :options="{ loop: true }"
            :autoplay-interval="5000"
            :autoplay="Boolean(block.content[0].autoplay)"
          >
            <template #item="{ item }">
              <picture v-if="isImageComponent(item) && item.image_desktop?.filename">
                <MediaSource
                  :media="getMediaQuery('md')"
                  :width="ratioDesktop.width"
                  :height="ratioDesktop.height"
                  :src="item.image_desktop.filename"
                  sizes="sm:100vw md:100vw lg:100vw"
                />

                <MediaSource
                  :width="ratioMobile.width || ratioDesktop.width"
                  :height="ratioMobile.height || ratioDesktop.height"
                  :src="item.image_mobile?.filename || item.image_desktop.filename"
                  sizes="2xs:100vw xs:100vw sm:100vw"
                />

                <NuxtImg
                  srcset=""
                  class="size-full object-cover"
                  :src="item.image_desktop.filename"
                  :alt="item.image_mobile?.alt || item.image_desktop.alt || 'Smith & Willis'"
                  loading="lazy"
                />
              </picture>
            </template>
          </UiCarousel>

          <button
            type="button"
            class="absolute top-1/2 left-0 -translate-y-1/2 z-1 p-(--app-outer-gutter) filter-shadow-light group"
            @click="previous"
          >
            <IconArrowLeft class="w-4.5 h-4 text-current opacity-80 transition-[opacity,translate] duration-200 ease-out group-hover:-translate-x-1 group-hover:opacity-100" />

            <span class="sr-only">Previous</span>
          </button>

          <button
            type="button"
            class="absolute top-1/2 right-0 -translate-y-1/2 z-1 p-(--app-outer-gutter) filter-shadow-light group"
            @click="next"
          >
            <IconArrowRight class="w-4.5 h-4 text-current opacity-80 transition-[opacity,translate] duration-200 ease-out group-hover:translate-x-1 group-hover:opacity-100" />

            <span class="sr-only">Next</span>
          </button>
        </div>

        <template v-else-if="block.content[0].component === 'video'">
          <MediaVideo
            v-if="block.content[0].video_mobile?.filename"
            :class="[
              'size-full object-cover',
              ratioMobileClass, ratioDesktopClass,
              { 'md:hidden': block.content[0].video_desktop?.filename },
            ]"
            :sources="[
              { src: block.content[0].video_mobile.filename },
            ]"
            playsinline
            autoplay
            muted
            loop
            lazy
          />

          <MediaVideo
            v-if="block.content[0].video_desktop?.filename"
            :class="[
              'size-full object-cover',
              ratioMobileClass, ratioDesktopClass,
              { 'hidden md:block': block.content[0].video_mobile?.filename },
            ]"
            :sources="[
              { src: block.content[0].video_desktop.filename },
            ]"
            playsinline
            autoplay
            muted
            loop
            lazy
          />
        </template>
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
