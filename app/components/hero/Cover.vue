<script lang="ts" setup>
import { useScroll } from '@vueuse/core'
import IconLogoMark from '@/assets/icons/logo-mark.svg'

const mapRange = (value: number): number => Math.max(0, Math.min(1, value / 100))
const reversePercentage = (percent: number): number => Math.max(0, Math.min(100, 100 - percent))

const ready = ref(false)
const { y } = useScroll(window)

const stylesOut = computed(() => (import.meta.server)
  ? {
      opacity: 1,
    }
  : {
      opacity: mapRange(reversePercentage(100 / (window.innerHeight / 3) * y.value)),
    },
)

onMounted(async () => {
  await wait(500)
  ready.value = true
})
</script>

<template>
  <div
    class="size-full text-warm-grey pointer-events-none transition-opacity duration-1500 ease-outQuart"
    :class="{
      'opacity-0': !ready,
    }"
  >
    <div
      class="hero-cover__wrapper wrapper flex items-center justify-center h-full"
      :style="stylesOut"
    >
      <IconLogoMark
        class="w-[9.75vw] min-w-[100px] max-w-[160px] h-auto transition-transform duration-1000 ease-outQuart scale-100"
        :class="{
          'scale-105 -rotate-3': !ready,
        }"
      />
    </div>
  </div>
</template>

<style>
@reference "@/assets/css/main.css";

.hero-cover__wrapper {
  background-image: radial-gradient(circle, --alpha(var(--color-black) / 50%) 0%, --alpha(var(--color-black) / 0%) 25%);
}
</style>
