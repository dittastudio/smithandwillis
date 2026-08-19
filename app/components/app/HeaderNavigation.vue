<script lang="ts" setup>
import type { Link, LinkGroup } from '#storyblok-components'

type NavItem = Link | LinkGroup

interface Props {
  items: NavItem[] | undefined
}

const { items } = defineProps<Props>()

const isLink = (item: NavItem): item is Link => item.component === 'link'
const isLinkGroup = (item: NavItem): item is LinkGroup => item.component === 'link_group'
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
          >
            {{ item.title }}
          </button>

          <div
            v-if="false"
            class="
              absolute
              top-0
              left-0
              w-full
              md:max-w-100
              h-svh
              bg-white
              text-offblack
              wrapper
              pt-20
            "
          >
            <!-- <button
              type="button"
              class="

              "
              @click="$emit('back')"
            >
              <IconClose class="w-6 h-6" />
            </button> -->

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
        </li>
      </template>
    </ul>
  </nav>
</template>
