<script lang="ts" setup>
import { X } from 'lucide-vue-next'

interface Props {
  immediate?: boolean
}

const { immediate = false } = defineProps<Props>()

interface Emits {
  (event: 'opened'): void
  (event: 'closed'): void
}

const emit = defineEmits<Emits>()

const modal = useTemplateRef('modal')
const modalOpen = ref(immediate)

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

const cancel = (event: Event) => {
  const target = event.target as HTMLElement

  const hasFileInput = event.composedPath().some((element) => {
    if (element instanceof HTMLInputElement) {
      return element.type === 'file'
    }
    return false
  })

  if (target instanceof HTMLInputElement && target.type === 'file') {
    return
  }

  if (hasFileInput) {
    return
  }

  close()
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
    class="fixed inset-0 block w-full h-dvh max-w-full max-h-none backdrop-blur-xl transition-opacity duration-1000 overflow-hidden [&::backdrop]:hidden bg-warm-grey/10"
    :class="{
      'opacity-0 delay-150 pointer-events-none': !modalOpen,
      'opacity-100 delay-0 pointer-events-auto': modalOpen,
    }"
    @cancel.prevent="cancel"
  >
    <div class="@container size-full">
      <div
        class="flex flex-col gap-4 size-full wrapper py-(--app-outer-gutter) @xl:py-16 overflow-y-scroll overscroll-contain"
        @click.self="close"
      >
        <div
          class="@container/modal-content relative w-full max-w-180 m-auto"
          :class="{
            'opacity-0 translate-y-[10%] scale-95 transition-[opacity,translate,scale] duration-[300ms,0ms,300ms] ease-out delay-[0ms,300ms,0ms]': !modalOpen,
            'opacity-100 translate-y-0 scale-100 transition-[opacity,translate,scale] duration-[500ms,500ms,0ms] ease-outQuart delay-500': modalOpen,
          }"
        >
          <div
            class="grid grid-cols-1 grid-rows-[--spacing(9)_1fr_--spacing(9)] gap-4 @xl/modal-content:grid-cols-[--spacing(9)_1fr_--spacing(9)] @xl/modal-content:grid-rows-1 after:content-[''] after:pointer-events-none"
          >
            <div class="pointer-events-none flex justify-end @xl/modal-content:h-full @xl/modal-content:order-3">
              <button
                class="flex flex-col items-center justify-center pointer-events-auto @xl/modal-content:sticky @xl/modal-content:top-0 @xl/modal-content:left-0 bg-offblack text-white rounded-xs outline-0 size-9 transition-opacity duration-200 ease-in-out hover:opacity-70"
                type="button"
                @click="close"
              >
                <span class="sr-only">Close</span>

                <X class="size-5" />
              </button>
            </div>

            <div class="w-full text-left pt-10 px-(--app-outer-gutter) pb-(--app-outer-gutter) @xl/modal-content:p-(--app-outer-gutter) @xl/modal-content:pb-(--app-outer-gutter) bg-offblack text-white @xl/modal-content:order-2 rounded-xs">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>
