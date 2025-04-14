<script lang="ts" setup>
import IconArrowLarge from '@/assets/icons/arrow-large.svg'
</script>

<template>
  <div class="relative h-[inherit]">
    <slot />

    <div
      class="
        ui-scroll-down
        absolute
        bottom-0
        left-0
        right-0
        z-1
        before:absolute
        before:bottom-0
        before:left-0
        before:right-0
        before:-z-1
        before:w-full
        before:h-[200%]
        before:mx-auto
      "
    >
      <button
        type="button"
        class="
          ui-scroll-down__button
          block
          size-full
          py-10
          transition-opacity
          duration-300
          ease-out
          hover:opacity-70
        "
        @click="scrollToWithEasing('#ui-scroll-down-anchor', 1000)"
      >
        <IconArrowLarge class="w-[16px] h-[18px] mx-auto animate-bounce" />

        <span class="sr-only">
          Scroll
        </span>
      </button>
    </div>
  </div>

  <div id="ui-scroll-down-anchor" />
</template>

<style>
@reference "../../assets/css/main.css";

.ui-scroll-down {
  &::before {
    opacity: 0.5;
    background-image: radial-gradient(ellipse at 50% 120%, --alpha(var(--color-black) / 100%) 0%, --alpha(var(--color-black) / 0%) 50%);
    transition: opacity 0.3s var(--ease-out);
  }

  &:has(.ui-scroll-down__button:hover)::before {
    opacity: 0.75;
  }
}
</style>
