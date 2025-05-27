<script lang="ts" setup>
import IconLogoMark from '@/assets/icons/logo-mark.svg'
import IconLogo from '@/assets/icons/logo.svg'

interface Props {
  error: {
    statusCode: number
    statusMessage: string
  }
}

const { error } = defineProps<Props>()

const message = computed(() => error?.statusCode && error?.statusMessage
  ? `${error?.statusCode} ${error?.statusMessage}`
  : 'an unexpected error',
)

useHead({
  title: message.value.toLowerCase(),
})
</script>

<template>
  <div class="w-full h-screen flex flex-col items-center justify-center gap-10 px-4">
    <div class="flex flex-col items-center gap-10 text-center">
      <a
        href="/"
        class="flex flex-col items-center gap-10 transition-opacity duration-300 ease-out hover:opacity-70"
      >
        <IconLogoMark class="w-[9.75vw] min-w-[100px] max-w-[160px] h-auto" />

        <IconLogo class="w-[174px] h-[13px] mx-auto lg:w-[232px] lg:h-[17px]" />
      </a>

      <h1 class="type-mix-medium">
        {{ message }}
      </h1>
    </div>
  </div>
</template>
