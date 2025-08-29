<script lang="ts" setup>
interface Props {
  id?: string
  types?: string[]
  maxSize?: number
}

export interface Payload {
  file: File | undefined
  metadata: {
    name?: string
    size?: number
    type?: string
    width?: number
    height?: number
  }
}

interface Emits {
  (event: 'selected', value: Payload): void
  (event: 'cleared'): void
}

const { id = '', types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'], maxSize = 500 * 1024 } = defineProps<Props>()
const emit = defineEmits<Emits>()

const input = useTemplateRef<HTMLInputElement>('input')
const preview = ref<string | undefined>(undefined)
const file = ref<File | undefined>(undefined)

const clear = () => {
  if (preview.value) {
    URL.revokeObjectURL(preview.value)
  }

  preview.value = undefined
  file.value = undefined

  if (input.value) {
    input.value.value = ''
  }

  emit('cleared')
}

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const selected = target.files?.[0]

  if (!selected) {
    clear()

    return
  }

  file.value = selected

  const metadata = {
    name: file.value.name,
    size: file.value.size,
    type: file.value.type,
    width: undefined,
    height: undefined,
  } as Payload['metadata']

  if (file.value && types.includes(file.value.type) && file.value.size <= maxSize && file.value.type.startsWith('image/')) {
    preview.value = URL.createObjectURL(file.value)

    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()

      img.onload = function () {
        metadata.width = img.width
        metadata.height = img.height
      }

      if (e.target && e.target.result && typeof e.target.result === 'string') {
        img.src = e.target.result
      }
    }

    reader.readAsDataURL(file.value)
  }

  emit('selected', { file: file.value, metadata })
}

onUnmounted(() => {
  clear()
})
</script>

<template>
  <div class="w-full flex flex-col items-start justify-start gap-4">
    <div
      as="div"
      class="
        outline-1
        outline-current/20
        hover:outline-current/50
        has-focus:outline-current
        -outline-offset-1
        relative
        w-full
        max-h-50
        flex
        flex-col
        items-center
        justify-center
        aspect-[5/2]
        cursor-pointer
        p-4
        rounded-xs
        transition-colors
        duration-200
        ease-in-out
      "
    >
      <img
        v-if="preview && file?.type.startsWith('image/')"
        :src="preview"
        alt="Image preview"
        class="max-w-1/3 max-h-30 aspect-square object-cover rounded-full"
      >

      <p
        v-else-if="file"
        class="text-14 text-center w-full wrap-break-word"
      >
        {{ file.name }}
      </p>

      <p
        v-else
        class="text-14 text-center w-full wrap-break-word"
      >
        Select File
      </p>

      <input
        :id="id"
        ref="input"
        class="absolute inset-0 opacity-0 cursor-pointer"
        type="file"
        :accept="types.join(',')"
        @change="onChange"
      >
    </div>

    <button
      v-if="file"
      type="button"
      class="text-12 transition-opacity duration-200 ease-in-out hover:opacity-70"
      @click="clear"
    >
      Remove File
    </button>
  </div>
</template>
