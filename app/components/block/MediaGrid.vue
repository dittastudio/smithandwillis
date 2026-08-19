<script lang="ts" setup>
import type { BlockMediaGrid } from '#storyblok-components'

interface Props {
  block: BlockMediaGrid
}

const { block } = defineProps<Props>()

const ratioMobile = computed(() => ratioDimensions(block.ratio_mobile))
const ratioDesktop = computed(() => ratioDimensions(block.ratio_desktop))
</script>

<template>
  <div v-editable="block">
    <ul
      :class="['grid grid-cols-1 gap-2.5', {
        'md:grid-cols-2': block.items.length === 2,
        'md:grid-cols-3': block.items.length === 3,
      }]"
    >
      <li
        v-for="item in block.items"
        :key="item._uid"
      >
        <template v-if="isGridImageComponent(item)">
          <picture v-if="item.image_desktop?.filename">
            <MediaSource
              :media="getMediaQuery('md')"
              :width="ratioDesktop.width"
              :height="ratioDesktop.height"
              :src="item.image_desktop.filename"
              sizes="sm:100vw md:100vw lg:100vw"
            />

            <MediaSource
              v-if="item.image_mobile?.filename || item.image_desktop?.filename"
              :width="ratioMobile.width"
              :height="ratioMobile.height"
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

        <template v-else-if="isGridVideoComponent(item)">
          <pre>{{ item }}</pre>
        </template>
      </li>
    </ul>
  </div>
</template>
