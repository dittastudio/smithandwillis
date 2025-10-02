<script lang="ts" setup>
interface Props {
  a11y?: boolean
  id?: string
  label?: string
  hint?: string
  as?: string
}

const {
  a11y = false,
  id = null,
  label = '',
  hint = '',
  as = 'label',
} = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-3 w-full">
    <Component
      :is="as"
      v-if="label"
      :class="a11y ? 'sr-only' : 'relative z-10 flex flex-col gap-0.5 items-baseline w-auto'"
      :for="id && as === 'label' ? id : null"
    >
      <span class="text-balance">
        {{ label }}
      </span>

      <span
        v-if="hint"
        class="text-balance w-auto text-12 opacity-40"
      >
        {{ hint }}
      </span>
    </Component>

    <slot />
  </div>
</template>
