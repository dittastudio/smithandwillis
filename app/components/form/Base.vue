<script lang="ts" setup>
interface Props {
  loading?: boolean
}

const { loading = false } = defineProps<Props>()
</script>

<template>
  <form
    novalidate
    class="@container/form w-full relative transition-opacity duration-500 ease-outQuint"
    :class="{
      'opacity-40 pointer-events-none select-none': loading,
    }"
  >
    <div class="flex flex-col gap-8 items-start justify-start w-full">
      <slot />
    </div>
  </form>
</template>
