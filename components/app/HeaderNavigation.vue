<script lang="ts" setup>
import type { LinkStoryblok } from '@/types/storyblok'

interface Props {
  items: LinkStoryblok[] | undefined
}

const { items } = defineProps<Props>()

const menuOpen = useState<boolean>('menuOpen')
</script>

<template>
  <nav
    class="app-header-navigation"
    :class="{ 'app-header-navigation--is-open': menuOpen }"
  >
    <ul
      class="
        flex
        flex-col
        md:flex-row
        md:items-center
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
        :class="item.link.linktype === 'url' && 'max-md:hidden'"
      >
        <StoryblokLink
          v-if="item.link"
          :item="item.link"
          class="block py-3 max-md:border-b max-md:border-solid max-md:border-warm-grey/20 md:p-4 md:-m-4 lg:p-6 lg:-m-6 transition-opacity duration-300 ease-out hover:opacity-70 [&.router-link-exact-active]:text-orange [&.router-link-active]:text-orange"
          @click="scrollToWithEasing(item.link?.url, 1000, true)"
        >
          {{ item.title }}
        </StoryblokLink>
      </li>
    </ul>
  </nav>
</template>
