<script lang="ts" setup>
import type { LinkStoryblok } from '@/types/storyblok'

interface Props {
  items: LinkStoryblok[]
}

const { items } = defineProps<Props>()
</script>

<template>
  <nav
    class="
      max-md:absolute
      max-md:top-0
      max-md:left-0
      max-md:right-0
      max-md:min-h-screen
      max-md:-z-1
    max-md:bg-rich-brown
    max-md:text-white
      max-md:hidden
    "
  >
    <ul
      class="
        flex
        items-center
        md:gap-8
        lg:gap-12
        font-mix
        text-15
        leading-5.5
        tracking-lg
        uppercase
        md:text-13
        lg:text-14
        md:leading-6
      "
    >
      <li
        v-for="item in items"
        :key="item._uid"
      >
        <StoryblokLink
          :item="item.link"
          class="
            block
            md:p-4
            md:-m-4
            lg:p-6
            lg:-m-6
            transition-opacity
            duration-300
            ease-out
            hover:opacity-70
            pointer-events-auto"
        >
          {{ item.title }}
        </StoryblokLink>
      </li>
    </ul>
  </nav>
</template>
