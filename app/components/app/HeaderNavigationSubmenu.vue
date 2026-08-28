<script lang="ts" setup>
import type { LinkGroup } from '#storyblok-components'
import IconArrowLeft from '@/assets/icons/arrow-large-left.svg'

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
      inset-0
      w-full
      h-dvh
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
        ease-out
      "
      :class="{
        'opacity-0 duration-1000': !isOpen,
        'opacity-100 duration-500': isOpen,
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
        py-5
        md:py-8
      bg-white
      text-offblack
        md:border-r
        md:border-offblack/10
        transition-transform
        duration-700
        ease-outExpo
        overflow-y-auto
        overscroll-contain
      "
      :class="{
        'translate-x-[-101%] duration-500 delay-100': !isOpen,
        'translate-x-0 duration-700': isOpen,
      }"
    >
      <button
        type="button"
        class="
          block
          pt-4
          pb-18
          md:p-16
          md:pt-3
          md:px-4
          md:-mx-4
          lg:px-6
          lg:-mx-6
          transition-[opacity,translate]
          duration-300
          ease-out
          hover:opacity-70
          hover:-translate-x-1
        "
        @click="emit('close')"
      >
        <IconArrowLeft class="w-4.5 h-4 pointer-events-none" />
      </button>

      <ul
        class="transition-opacity ease-out"
        :class="{
          'opacity-0 duration-150': !isOpen,
          'opacity-100 duration-1000 delay-200': isOpen,
        }"
      >
        <li
          v-for="(link, index) in item.links"
          :key="link._uid"
          :style="`--item-index: ${index}`"
        >
          <StoryblokLink
            v-if="link.link?.cached_url"
            :item="link.link"
            class="
              block
              p-6
              -m-6
              transition-[opacity,color]
              duration-300
              ease-out
              hover:opacity-60
            "
            @click="scrollToWithEasing(link.link?.url, 1000, true)"
          >
            <h4 class="type-serif-medium-caps flex items-center gap-2">
              {{ link.title }}
            </h4>

            <p
              v-if="link.subtitle"
              class="type-serif-medium italic opacity-70"
            >
              {{ link.subtitle }}
            </p>
          </StoryblokLink>
        </li>
      </ul>
    </div>
  </div>
</template>
