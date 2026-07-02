<script lang="ts" setup>
interface Props {
  isOpen?: boolean
}

const { isOpen = false } = defineProps<Props>()

const wrapperClasses = computed(() => {
  const base = 'grid overflow-hidden transition-[grid-template-rows] duration-500 ease-inOutQuart'

  return `${base} ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`
})

const contentClasses = computed(() => {
  const base = 'min-h-0 transition-opacity ease-out transform-gpu'

  return isOpen
    ? `${base} opacity-100 duration-400 delay-300`
    : `${base} opacity-0 duration-200`
})
</script>

<template>
  <div :class="wrapperClasses">
    <div :class="contentClasses">
      <slot />
    </div>
  </div>
</template>
