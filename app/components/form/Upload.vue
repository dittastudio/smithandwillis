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

const preview = ref<string | null>(null)

const clear = () => {
  if (preview.value) {
    URL.revokeObjectURL(preview.value)
    preview.value = null
  }

  emit('cleared')
}

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  const metadata = {
    name: file?.name,
    size: file?.size,
    type: file?.type,
    width: undefined,
    height: undefined,
  } as Payload['metadata']

  clear()

  if (file && types.includes(file.type) && file.size <= maxSize) {
    preview.value = URL.createObjectURL(file)

    if (file.type.startsWith('image/')) {
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

      reader.readAsDataURL(file)
    }
  }

  emit('selected', { file, metadata })
}

onUnmounted(() => {
  clear()
})
</script>

<template>
  <div class="w-full flex flex-col items-start justify-start gap-4">
    <div
      as="div"
      class="relative w-full max-h-50 flex flex-col items-center justify-center aspect-[5/2] cursor-pointer"
    >
      <img
        v-if="preview"
        :src="preview"
        alt="Image preview"
        class="max-w-1/3 max-h-30 aspect-square object-cover rounded-full"
      >

      <p v-else>
        Select Image
      </p>

      <input
        :id="id"
        class="absolute inset-0 opacity-0 cursor-pointer"
        type="file"
        :accept="types.join(',')"
        @change="onChange"
      >
    </div>

    <button
      v-if="preview"
      type="button"
      @click="clear"
    >
      Remove Image
    </button>
  </div>
</template>
