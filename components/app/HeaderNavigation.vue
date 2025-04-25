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
        :class="item.link.linktype === 'url' && 'max-md:hidden'"
      >
        <StoryblokLink
          v-if="item.link"
          :item="item.link"
          class="
            block
            py-3
            max-md:border-b
            max-md:border-solid
            max-md:border-warm-grey/20
            md:p-4
            md:-m-4
            lg:p-6
            lg:-m-6
            transition-[opacity,color]
            duration-300
            ease-out
            hover:opacity-70
            max-md:[&.router-link-active]:text-orange
            max-md:[&.router-link-exact-active]:text-orange
          "
          @click="scrollToWithEasing(item.link?.url, 1000, true)"
        >
          <span
            class="
              md:relative
              md:before:absolute
              md:before:left-0
              md:before:right-[var(--tracking-lg)]
              md:before:-bottom-1
              md:before:h-[1px]
              md:before:bg-current
              md:before:opacity-0
              md:before:translate-y-1
              md:[a.router-link-active>&]:before:opacity-30
              md:[a.router-link-exact-active>&]:before:opacity-30
              md:[a.router-link-active>&]:before:translate-y-0
              md:[a.router-link-exact-active>&]:before:translate-y-0
              md:before:transition-[opacity,translate]
              md:before:duration-300
              md:before:ease-out
            "
          >
            {{ item.title }}
          </span>
        </StoryblokLink>
      </li>
    </ul>
  </nav>
</template>
