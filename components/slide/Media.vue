<script lang="ts" setup>
interface Props {
  items: any[]
  ratioX?: number
  ratioY?: number
  ratioDesktopX?: number
  ratioDesktopY?: number
}

const { items, ratioX = 10, ratioY = 16, ratioDesktopX = 16, ratioDesktopY = 9 } = defineProps<Props>()
</script>

<template>
  <div class="relative flex flex-col md:flex-row h-full">
    <template
      v-for="item in items"
      :key="item.id"
    >
      <MediaImageResponsive
        v-if="storyblokAssetType(item?.filename || '') === 'image'"
        :asset="item"
        :desktop-asset="item"
        :ratio="`${ratioX}:${ratioY / (items?.length || 1)}`"
        :desktop-ratio="`${ratioDesktopX / (items?.length || 1)}:${ratioDesktopY}`"
        sizes="100vw sm:100vw md:100vw"
        desktop-sizes="md:100vw lg:100vw xl:100vw 2xl:100vw"
      />

      <div
        v-if="storyblokAssetType(item?.filename || '') === 'video'"
        class="w-full"
      >
        <video
          :src="item.filename"
          class="slide-images__video w-full h-full object-cover"
          autoplay
          muted
          loop
          playsinline
          :style="{
            '--ratio-mobile': `${ratioX} / ${ratioY / (items?.length || 1)}`,
            '--ratio-desktop': `${ratioDesktopX / (items?.length || 1)} / ${ratioDesktopY}`,
          }"
        />
      </div>
    </template>
  </div>
</template>

<style>
@reference "../../assets/css/main.css";

.slide-images__video {
  aspect-ratio: var(--ratio-mobile);

  @variant md {
    aspect-ratio: var(--ratio-desktop);
  }
}
</style>
