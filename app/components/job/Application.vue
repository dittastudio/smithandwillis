<script lang="ts" setup>
import type { Payload } from '@/components/form/Upload.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm, useValidateForm } from 'vee-validate'
import { z } from 'zod'

interface Props {
  legend?: string
}

const { legend } = defineProps<Props>()

const loading = ref<boolean>(false)
const status = ref<{
  type: 'error' | 'success'
  message: string
} | null>(null)

const MAX_FILE_SIZE = 500 * 1024 // 500KB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']

const validationSchema = toTypedSchema(
  z.object({
    image: z
      .instanceof(File)
      .optional()
      .refine(file => (!file) ? true : file.size <= MAX_FILE_SIZE, 'Image must be less than 500KB')
      .refine(file => (!file) ? true : ALLOWED_FILE_TYPES.includes(file.type), 'Image must be JPEG, PNG, WebP, or GIF'),
    comment: z
      .string()
      .trim()
      .max(280, 'Comment must be less than 280 characters')
      .default(''),
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .max(50, 'Name must be less than 50 characters')
      .regex(/^[a-z\s\-'.]+$/i, 'Name contains invalid characters')
      .default(''),
  }),
)

const { errors } = useForm({
  validationSchema,
})

const validate = useValidateForm()
const { value: comment } = useField<string>('comment')
const { value: name } = useField<string>('name')
const { value: image, setValue: setImageValue } = useField<File | undefined>('image')

const metadata = ref<Payload['metadata']>({})

const setMetaData = (data: Payload['metadata']) => {
  metadata.value = data
}

const defaultErrorMessage = 'Please check the form and try again.'

const imageSelected = ({ file, metadata }: Payload) => {
  setImageValue(file)
  setMetaData(metadata)
}
const imageCleared = () => setImageValue(undefined)

const onSubmit = async () => {
  try {
    loading.value = true

    const { valid } = await validate()

    if (!valid) {
      throw new Error(defaultErrorMessage)
    }

    const formData = new FormData()

    if (image.value) {
      formData.append('image', image.value)
      formData.append('metadata', JSON.stringify(metadata.value))
    }

    formData.append('comment', comment.value.trim())
    formData.append('name', name.value.trim())

    const createEntry = await $fetch('/api/guestbook/createEntry', {
      method: 'POST',
      body: formData,
    })

    if (!createEntry || createEntry.statusCode !== 200) {
      throw new Error(createEntry?.statusMessage || defaultErrorMessage)
    }

    status.value = {
      type: 'success',
      message: 'Your entry has been successfully made.',
    }
  }
  catch (error: any) {
    // console.error('Error creating entry:', error)
    status.value = {
      type: 'error',
      message: error.statusMessage || defaultErrorMessage,
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div v-if="status && status.type === 'success'">
      <p>Thanks for sharing your experience with us. We'll review your submission shortly.</p>
    </div>

    <FormBase
      v-else
      :loading="loading"
      @submit.prevent="onSubmit"
    >
      <FormFieldset
        :legend="legend"
        a11y
      >
        <FormField
          id="image"
          label="Image"
          hint="Optional image (JPEG, PNG, WebP, GIF - max 500KB)"
        >
          <FormUpload
            id="image"
            :types="ALLOWED_FILE_TYPES"
            :max-size="MAX_FILE_SIZE"
            @selected="imageSelected"
            @cleared="imageCleared"
          />

          <FormMessage
            v-if="errors.image"
            :message="errors.image"
          />
        </FormField>

        <FormField
          id="comment"
          label="Comment"
          hint="Thoughts about your experience"
        >
          <FormInput
            id="comment"
            v-model="comment"
            placeholder="Enter your comment"
          />

          <FormMessage
            v-if="errors.comment"
            :message="errors.comment"
          />
        </FormField>

        <FormField
          id="name"
          label="Name *"
          hint="As you want it to appear in the guestbook"
        >
          <FormInput
            id="name"
            v-model="name"
            placeholder="Enter your name"
          />

          <FormMessage
            v-if="errors.name"
            :message="errors.name"
          />
        </FormField>
      </FormFieldset>

      <FormMessage
        v-if="status"
        :type="status.type"
        :message="status.message"
      />

      <button>
        <UiLoading v-if="loading" />
        {{ loading ? 'Please wait...' : 'Submit' }}
      </button>
    </FormBase>
  </div>
</template>
