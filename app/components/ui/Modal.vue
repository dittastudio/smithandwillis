<script lang="ts" setup>
import { X } from 'lucide-vue-next'

interface Props {
  openImmediate?: boolean
}

const { openImmediate = false } = defineProps<Props>()

interface Emits {
  (event: 'opened'): void
  (event: 'closed'): void
}

const emit = defineEmits<Emits>()

const modal = useTemplateRef<HTMLDialogElement>('modal')
const modalOpen = ref(openImmediate)
const attrs = useAttrs()
const baseClasses = '@container/modal-content relative w-full max-w-154 m-auto transition-[opacity,translate] duration-500 ease-inOutSine'

const mergedAttrs = computed(() => ({
  ...attrs,
  class: typeof attrs.class === 'string' ? twMerge(baseClasses, attrs.class) : baseClasses,
}))

const open = () => {
  modal.value?.showModal()
  modalOpen.value = true

  emit('opened')
}

const close = async () => {
  modalOpen.value = false

  await wait(1000)

  modal.value?.close()
  emit('closed')
}

defineExpose({
  open,
  close,
})

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <template v-if="$slots.trigger">
    <div
      role="button"
      tabindex="0"
      :aria-pressed="modalOpen"
      class="size-full cursor-pointer"
      @click="open"
    >
      <slot name="trigger" />
    </div>
  </template>

  <dialog
    ref="modal"
    class="fixed inset-0 w-full h-dvh max-w-full max-h-none backdrop-blur-2xl transition-opacity duration-500 overflow-hidden [&::backdrop]:hidden bg-black/10"
    :class="{
      'opacity-0 delay-500 pointer-events-none': !modalOpen,
      'opacity-100 delay-0 pointer-events-auto': modalOpen,
    }"
    @cancel.prevent="close"
  >
    <div class="@container size-full">
      <div
        data-lenis-prevent
        class="flex flex-col gap-4 size-full px-4 pt-18 pb-16 @2xl:py-20 overflow-y-scroll overscroll-contain"
        @click.self="close"
      >
        <div
          v-bind="mergedAttrs"
          :class="{
            'opacity-0 translate-y-1/2 delay-0': !modalOpen,
            'opacity-100 translate-y-0 delay-500': modalOpen,
          }"
        >
          <div
            class="grid grid-cols-1 grid-rows-[--spacing(9)_1fr_--spacing(9)] gap-4 @xl/modal-content:grid-cols-[--spacing(9)_1fr_--spacing(9)] @xl/modal-content:grid-rows-1 after:content-[''] after:pointer-events-none"
          >
            <div class="pointer-events-none flex justify-end @xl/modal-content:h-full @xl/modal-content:order-3">
              <button
                class="flex flex-col items-center justify-center pointer-events-auto @xl/modal-content:sticky @xl/modal-content:top-0 @xl/modal-content:left-0 bg-white outline-0 size-9"
                type="button"
                @click="close"
              >
                <span class="sr-only">Close</span>

                <X class="size-3 text-black" />
              </button>
            </div>

            <div class="w-full text-left p-6 @xl/modal-content:p-8 bg-white @xl/modal-content:order-2">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>
