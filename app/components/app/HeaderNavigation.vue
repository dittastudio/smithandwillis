<script lang="ts" setup>
import type { Link, LinkGroup } from '#storyblok-components'

type NavItem = Link | LinkGroup

interface Props {
  items: NavItem[] | undefined
}

const { items } = defineProps<Props>()

const isLink = (item: NavItem): item is Link => item.component === 'link'
const isLinkGroup = (item: NavItem): item is LinkGroup => item.component === 'link_group'

const submenuOpen = useState<string | null>('submenuOpen')

const openSubmenu = (uid: string) => {
  submenuOpen.value = uid
}

const closeSubmenu = () => {
  submenuOpen.value = null
}

const classesNavItem = 'text-15 md:text-13 lg:text-14 leading-6 tracking-xl uppercase'
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
      "
    >
      <template
        v-for="item in items"
        :key="item._uid"
      >
        <li
          v-if="isLink(item) && item.link?.cached_url"
          :class="[{
            'max-md:hidden': item.hide_on_mobile,
          }]"
        >
          <StoryblokLink
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
              hover:text-orange-soft
              [&.router-link-active]:text-orange-soft
              [&.router-link-exact-active]:text-orange-soft
            "
            :class="classesNavItem"
            @click="scrollToWithEasing(item.link?.url, 1000, true)"
          >
            {{ item.title }}
          </StoryblokLink>
        </li>

        <li v-else-if="isLinkGroup(item) && item.links.length">
          <button
            type="button"
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
              hover:text-orange-soft
            "
            :class="classesNavItem"
            @click="openSubmenu(item._uid)"
          >
            {{ item.title }}
          </button>

          <AppHeaderNavigationSubmenu
            :item="item"
            :is-open="submenuOpen === item._uid"
            @close="closeSubmenu"
          />
        </li>
      </template>
    </ul>
  </nav>
</template>
