<script lang="ts" setup>
const menuOpen = useState<boolean>('menuOpen')
</script>

<template>
  <div
    class="
      app-header-menu
      max-md:absolute
      max-md:top-0
      max-md:left-0
      max-md:right-0
      max-md:min-h-screen
      max-md:-z-1
      max-md:bg-rich-brown
      max-md:text-white
      max-md:pt-[var(--header-height)]
    "
    :class="{ 'app-header-menu--is-open': menuOpen }"
  >
    <slot />
  </div>
</template>

<style>
@reference "../../assets/css/main.css";

.app-header-menu {
  width: 100%;

  @variant md {
    display: flex;
    justify-content: space-between;
  }

  @variant max-md {
    transition: opacity 0.3s ease-out;
    opacity: 0;
    pointer-events: none;
    padding-inline: var(--app-outer-gutter);

    &--is-open {
      opacity: 1;
      pointer-events: auto;
    }
  }
}
</style>
