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
      max-md:min-h-dvh
      max-md:-z-1
      max-md:bg-rich-brown
      max-md:text-white
      max-md:pt-[calc(var(--header-height)_+_--spacing(6))]
    "
    :class="{ 'app-header-menu--is-open': menuOpen }"
  >
    <div class="app-header-menu__inner">
      <slot />
    </div>
  </div>
</template>

<style>
@reference "../../assets/css/main.css";

.app-header-menu {
  @variant max-md {
    transition: opacity 0.5s var(--ease-in-out), visibility 0.5s var(--ease-in-out);
    opacity: 0;
    visibility: hidden;
    padding-inline: var(--app-outer-gutter);

    &--is-open {
      opacity: 1;
      visibility: visible;
    }
  }
}

.app-header-menu__inner {
  @variant md {
    display: flex;
    justify-content: space-between;
  }

  @variant max-md {
    transition: opacity 0.15s var(--ease-in-out);
    opacity: 0;

    .app-header-menu--is-open & {
      transition: opacity 0.5s var(--ease-in-out) 0.4s;
      opacity: 1;
    }
  }
}
</style>
