<script lang="ts" setup>
import type { AssetStoryblok } from '@/types/storyblok'
import { calculateAspectRatio, ratioDimensions, validAspectRatio } from '@/utils/helpers'
import { storyblokImage, storyblokImageDimensions, storyblokImageUrlUpdate } from '@/utils/storyblok'
import { useIntersectionObserver } from '@vueuse/core'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs() as { [key: string]: any }

interface Props {
  asset: AssetStoryblok
  ratio?: string | number
  sizes: string
  alt?: string
  lazy?: boolean
}

const { asset, ratio, sizes, lazy = true } = defineProps<Props>()

const container = ref<HTMLPictureElement | null>(null)
const ready = ref(!lazy)
const loaded = ref(!lazy)

const { width, height } = storyblokImageDimensions(asset.filename)

const ratioValid = validAspectRatio(ratio)
const ratioFormat = ratio && ratioValid ? calculateAspectRatio(ratioDimensions(ratio).width, ratioDimensions(ratio).height) : calculateAspectRatio(width, height)

const size = {
  width: ratioDimensions(ratioFormat).width,
  height: ratioDimensions(ratioFormat).height,
}

const placeholder = storyblokImage(
  asset.filename,
  {
    width: size.width,
    height: size.height,
    quality: 10,
    focal: asset.focus ?? undefined,
  },
)

useIntersectionObserver(
  container,
  ([{ target, isIntersecting }], observerElement) => {
    if (!(target instanceof HTMLPictureElement))
      return

    if (isIntersecting && !ready.value) {
      ready.value = true
      observerElement.disconnect()
    }
  },
  { rootMargin: '0px 0px 0px 0px', threshold: 0.25 },
)

const imgMain = useImage()

const imgInfo = computed(() => imgMain.getSizes(storyblokImageUrlUpdate(asset.filename), {
  provider: 'storyblok',
  sizes,
  modifiers: {
    width: size.width,
    height: size.height,
    quality: 80,
    filters: {
      focal: asset.focus ?? undefined,
    },
  },
}))

const { class: className, ...rest } = attrs

const imgAttrs = computed(() => ({
  ...rest,
  width: size.width,
  height: size.height,
  src: ready.value ? storyblokImageUrlUpdate(asset.filename) : '',
  sizes: ready.value ? imgInfo.value.sizes : '',
  srcset: ready.value ? imgInfo.value.srcset : '',
  alt: attrs.value?.alt ?? asset.alt ?? '',
}))
</script>

<template>
  <picture
    ref="container"
    class="media-image"
    :class="className"
  >
    <img
      v-bind="imgAttrs"
      class="media-image__file"
      :class="[{ 'is-loaded': loaded, 'is-lazy': lazy }]"
      :loading="lazy ? 'eager' : 'lazy'"
      @load="loaded = true"
    >

    <img
      v-if="lazy"
      class="media-image__placeholder"
      :src="placeholder"
      :width="size.width"
      :height="size.height"
      alt=""
      loading="lazy"
    >
  </picture>
</template>

<style lang="postcss" scoped>
.media-image {
  --media-image-fade-duration: 1s;

  isolation: isolate;
  position: relative;

  overflow: hidden;
  display: block;

  width: 100%;
  height: inherit;
}

.media-image__file {
  width: 100%;
  height: auto;

  &.is-lazy {
    position: absolute;
    z-index: 1;
    inset: 0;

    backface-visibility: hidden;
    opacity: 0;

    transition: opacity var(--media-image-fade-duration) var(--ease-out);
  }

  &.is-loaded {
    opacity: 1;
  }
}

.media-image__placeholder {
  pointer-events: none;

  width: 100%;
  height: auto;

  backface-visibility: hidden;
  opacity: 1;
  filter: blur(8px);

  transition: opacity calc(var(--media-image-fade-duration) * 2) var(--ease-out) calc(var(--media-image-fade-duration) / 2);

  .media-image__file.is-loaded + & {
    opacity: 0;
  }
}
</style>
