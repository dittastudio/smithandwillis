<script lang="ts" setup>
import type { Link, LinkGroup } from '#storyblok-components'
import IconArrowLarge from '@/assets/icons/arrow-large.svg'

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
        tracking-xl
        uppercase
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
            @click="openSubmenu(item._uid)"
          >
            {{ item.title }}
          </button>

          <div
            class="
              absolute
              top-0
              left-0
              w-full
              h-svh
            "
            :class="{
              'pointer-events-none': submenuOpen !== item._uid,
              'pointer-events-auto': submenuOpen === item._uid,
            }"
          >
            <div
              class="
                absolute
                inset-0
                bg-white/20
                backdrop-blur-lg
                transition-opacity
                duration-600
                ease-out
              "
              :class="{
                'opacity-0': submenuOpen !== item._uid,
                'opacity-100': submenuOpen === item._uid,
              }"
              @click="closeSubmenu"
            />

            <div
              class="
                flex
                flex-col
                w-full
                md:max-w-100
                ml-0
                h-full
                wrapper
              bg-white
              text-offblack
                border-r
                border-offblack/5
                transition-transform
                duration-300
                ease-outQuart
              "
              :class="{
                '-translate-x-full': submenuOpen !== item._uid,
                'translate-x-0': submenuOpen === item._uid,
              }"
            >
              <button
                type="button"
                class="
                  block
                  pt-9
                  pb-10
                  md:pt-11
                  md:pb-10
                  md:px-4
                  md:-mx-4
                  lg:px-6
                  lg:-mx-6
                "
                @click="closeSubmenu"
              >
                <IconArrowLarge class="w-4 h-4 rotate-90 pointer-events-none" />
              </button>

              <ul>
                <li
                  v-for="link in item.links"
                  :key="link._uid"
                >
                  <StoryblokLink
                    v-if="link.link?.cached_url"
                    :item="link.link"
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
                    @click="scrollToWithEasing(link.link?.url, 1000, true)"
                  >
                    {{ link.title }}
                  </StoryblokLink>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </nav>
</template>
