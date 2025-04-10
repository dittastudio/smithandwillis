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
  <div class="flex flex-col md:flex-row h-full">
    <template
      v-for="item in items"
      :key="item.id"
    >
      <MediaImageResponsive
        :asset="item"
        :desktop-asset="item"
        :ratio="`${ratioX}:${ratioY / (items?.length || 1)}`"
        :desktop-ratio="`${ratioDesktopX / (items?.length || 1)}:${ratioDesktopY}`"
        sizes="100vw sm:100vw md:100vw"
        desktop-sizes="md:100vw lg:100vw xl:100vw 2xl:100vw"
      />
    </template>
  </div>
</template>
