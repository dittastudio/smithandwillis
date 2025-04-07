<script lang="ts" setup>
import { safeKebabCase } from '@/utils/helpers'

interface Props {
  id: string
}

const { id } = defineProps<Props>()
const isOpen = ref<boolean>(false)

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}

const isScreenSm = useAtMedia(`(min-width: 600px)`)

watchEffect(() => {
  if (!import.meta.client) {
    return
  }

  isOpen.value = isScreenSm.value
})

const headerId = `accordion-header-${safeKebabCase(id)}`
const bodyId = `accordion-body-${safeKebabCase(id)}`
</script>

<template>
  <div
    class="
      app-footer-accordion
      relative
      w-full
      max-sm:border-b
      max-sm:border-current/20
    "
  >
    <button
      :id="headerId"
      type="button"
      class="flex items-center justify-between w-full max-sm:py-3 sm:pointer-events-none"
      :tabindex="isScreenSm ? '-1' : '0'"
      :aria-label="isOpen ? 'Close accordion' : 'Open accordion'"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="bodyId"
      @click="toggleAccordion"
    >
      <slot name="title" />

      <span class="relative top-1 w-4.5 h-2.5 sm:hidden">
        <span
          class="absolute top-0 left-0 w-3/5 h-[1px] transition-[rotate] duration-500 ease-inOutQuart"
          :class="{
            'rotate-45': !isOpen,
            '-rotate-45': isOpen,
          }"
        >
          <span
            class="block size-full bg-current origin-left"
            :class="{
              'animate-[var(--accordion-wing-leave)]': !isOpen,
              'animate-[var(--accordion-wing-enter)]': isOpen,
            }"
          />
        </span>

        <span
          class="absolute top-0 right-0 w-3/5 h-[1px] transition-[rotate] duration-500 ease-inOutQuart"
          :class="{
            '-rotate-45': !isOpen,
            'rotate-45': isOpen,
          }"
        >
          <span
            class="block size-full bg-current origin-right"
            :class="{
              'animate-[var(--accordion-wing-leave)]': !isOpen,
              'animate-[var(--accordion-wing-enter)]': isOpen,
            }"
          />
        </span>
      </span>
    </button>

    <UiExpandCollapse :is-open="isOpen">
      <div
        :id="bodyId"
        role="region"
        :aria-labelledby="headerId"
        class="pb-5 sm:pt-4"
      >
        <slot name="content" />
      </div>
    </UiExpandCollapse>
  </div>
</template>

<style lang="postcss">
.app-footer-accordion {
  --accordion-scale: 0.9 1;
  --accordion-wing-leave: wing-leave 0.5s var(--ease-inOutQuart) forwards;
  --accordion-wing-enter: wing-enter 0.5s var(--ease-inOutQuart) forwards;
}

@keyframes wing-leave {
  0% {
    scale: 1 1;
  }

  50% {
    scale: var(--accordion-scale);
  }

  100% {
    scale: 1 1;
  }
}

@keyframes wing-enter {
  0% {
    scale: 1 1;
  }

  50% {
    scale: var(--accordion-scale);
  }

  100% {
    scale: 1 1;
  }
}
</style>
