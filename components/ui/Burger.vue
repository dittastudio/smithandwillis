<script lang="ts" setup>
interface Props {
  isOpen?: boolean
}

const { isOpen = false } = defineProps<Props>()
</script>

<template>
  <span
    class="ui-burger"
    :class="{ 'ui-burger--is-open': isOpen }"
  >
    <span class="ui-burger__inner" />

    <span class="sr-only">Toggle menu</span>
  </span>
</template>

<style scoped>
@reference "../../assets/css/main.css";

.ui-burger {
  --burger-button-height: --spacing(6);
  --burger-size: --spacing(4.125); /* 16.5px */

  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--burger-size);
  height: var(--burger-button-height);
}

.ui-burger__inner {
  --burger-height: 1px;
  --burger-offset: 4px;

  position: relative;
  display: block;
  width: var(--burger-size);
  height: var(--burger-height);

  &::before,
  &::after {
    --trans-out-open: 0.5s var(--ease-outExpo) 0.5s;
    --trans-in-open: 0.5s var(--ease-inExpo);
    --trans-out-close: 0.25s var(--ease-out) 0.25s;
    --trans-in-close: 0.25s var(--ease-inExpo);

    content: '';

    position: absolute;
    top: 0;
    left: 0;

    width: var(--burger-size);
    height: 100%;

    background-color: currentcolor;

    transition:
      translate var(--trans-out-close),
      rotate var(--trans-in-close);
  }

  &::before {
    translate: 0 calc(-1 * var(--burger-offset)) 0;
  }

  &::after {
    translate: 0 var(--burger-offset) 0;
  }

  .ui-burger--is-open & {
    &::before,
    &::after {
      transition:
        translate var(--trans-in-open),
        rotate var(--trans-out-open);
    }

    &::before {
      translate: 0 0 0;
      rotate: 45deg;
    }

    &::after {
      translate: 0 0 0;
      rotate: -45deg;
    }
  }
}
</style>
