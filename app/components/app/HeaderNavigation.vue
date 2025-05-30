<script lang="ts" setup>
import type { LinkStoryblok } from '@@/types/storyblok'

interface Props {
  items: LinkStoryblok[] | undefined
}

const { items } = defineProps<Props>()
</script>

<template>
  <nav>
    <ul
      class="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:gap-8
        lg:gap-12
        text-15
        md:text-13
        lg:text-14
        leading-6
        tracking-lg
        uppercase
      "
    >
      <li
        v-for="item in items"
        :key="item._uid"
        :class="[{
          'max-md:hidden': item.link.linktype === 'url',
        }]"
      >
        <StoryblokLink
          v-if="item.link"
          :item="item.link"
          class="
            block
            py-3
            md:p-4
            md:-m-4
            lg:p-6
            lg:-m-6
            transition-colors
            duration-300
            ease-out
            hover:text-orange
            [&.router-link-active]:text-orange
            [&.router-link-exact-active]:text-orange
          "
          @click="scrollToWithEasing(item.link?.url, 1000, true)"
        >
          {{ item.title }}
        </StoryblokLink>
      </li>
    </ul>
  </nav>
</template>
