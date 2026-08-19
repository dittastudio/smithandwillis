<script lang="ts" setup>
import type { LinkGroup } from '#storyblok-components'
import IconArrowLarge from '@/assets/icons/arrow-large.svg'

interface Props {
  item: LinkGroup
  isOpen: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <div
    class="
      absolute
      top-0
      left-0
      w-full
      h-svh
    "
    :class="{
      'pointer-events-none': !isOpen,
      'pointer-events-auto': isOpen,
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
        'opacity-0': !isOpen,
        'opacity-100': isOpen,
      }"
      @click="emit('close')"
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
        '-translate-x-full': !isOpen,
        'translate-x-0': isOpen,
      }"
    >
      <button
        type="button"
        class="
          block
          pt-9
          pb-15
          md:pt-11
          md:px-4
          md:-mx-4
          lg:px-6
          lg:-mx-6
        "
        @click="emit('close')"
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
              p-5
              -m-5
              md:p-6
              md:-m-6
              transition-[opacity,color]
              duration-300
              ease-out
              hover:opacity-60
              [&.router-link-active]:text-orange-soft
              [&.router-link-exact-active]:text-orange-soft
            "
            @click="scrollToWithEasing(link.link?.url, 1000, true)"
          >
            <h4
              v-if="link.title"
              class="type-serif-medium-caps flex items-center gap-2"
            >
              {{ link.title }}
            </h4>

            <p
              v-if="link.subtitle"
              class="type-serif-medium italic opacity-60"
            >
              {{ link.subtitle }}
            </p>
          </StoryblokLink>
        </li>
      </ul>
    </div>
  </div>
</template>
