<script lang="ts" setup>
import type { Payload } from '@/components/form/Upload.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm, useValidateForm } from 'vee-validate'
import { z } from 'zod'

interface Props {
  legend?: string
  headline?: string
  recipient?: string
}

const { legend, headline, recipient } = defineProps<Props>()
const loading = ref<boolean>(false)
const status = ref<{
  type: 'error' | 'success'
  message: string
} | null>(null)

const MAX_FILE_SIZE = 500 * 1024 // 500KB
const ALLOWED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

const validationSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .max(50, 'Name must be less than 50 characters'),
    email: z
      .email()
      .trim(),
    file: z
      .instanceof(File, { message: 'A file attachment is required' })
      .refine(file => (!file) ? true : file.size <= MAX_FILE_SIZE, 'File must be less than 500KB')
      .refine(file => (!file) ? true : ALLOWED_FILE_TYPES.includes(file.type), 'File must be a PDF or Word document'),
    cover: z
      .string()
      .trim()
      .max(1000, 'Cover must be less than 1000 characters'),
  }),
)

const { errors } = useForm({
  validationSchema,
  initialValues: {
    name: '',
    email: '',
    file: undefined,
    cover: '',
  },
})

const validate = useValidateForm()
const { value: name } = useField<string>('name')
const { value: email } = useField<string>('email')
const { value: file, setValue: setFileValue } = useField<File | undefined>('file')
const { value: cover } = useField<string>('cover')

const metadata = ref<Payload['metadata']>({})

const setMetaData = (data: Payload['metadata']) => {
  metadata.value = data
}

const defaultErrorMessage = 'Please check the form and try again.'

const fileSelected = ({ file, metadata }: Payload) => {
  setFileValue(file)
  setMetaData(metadata)
}

const fileCleared = () => setFileValue(undefined)

const onSubmit = async () => {
  try {
    loading.value = true

    const { valid } = await validate()

    if (!valid) {
      throw new Error(defaultErrorMessage)
    }

    const formData = new FormData()

    formData.append('name', name.value.trim())
    formData.append('email', email.value.trim())

    if (file.value) {
      formData.append('file', file.value)
      formData.append('metadata', JSON.stringify(metadata.value))
    }

    formData.append('cover', cover.value.trim())
    formData.append('recipient', recipient || '')

    const createApplication = await $fetch('/api/createApplication', {
      method: 'POST',
      body: formData,
    })

    if (!createApplication || createApplication.statusCode !== 200) {
      throw new Error(createApplication?.statusMessage || defaultErrorMessage)
    }

    status.value = {
      type: 'success',
      message: 'Your application has been successfully made.',
    }
  }
  catch (error: any) {
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
      <p>Thanks for applying with us. We'll review your submission shortly.</p>
    </div>

    <template v-else>
      <div class="flex flex-col gap-8">
        <h2
          v-if="headline"
          class="type-sans-medium-caps"
        >
          {{ headline }}
        </h2>

        <FormBase
          :loading="loading"
          @submit.prevent="onSubmit"
        >
          <FormFieldset
            :legend="legend"
            a11y
          >
            <FormField
              id="name"
              label="Name *"
              hint="Your full legal name"
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

            <FormField
              id="email"
              label="Email *"
              hint="You will receive a confirmation email"
            >
              <FormInput
                id="email"
                v-model="email"
                placeholder="Enter your email address"
              />

              <FormMessage
                v-if="errors.email"
                :message="errors.email"
              />
            </FormField>

            <FormField
              id="file"
              label="File Attachment *"
              hint="File must be a PDF or Word document"
            >
              <FormUpload
                id="file"
                :types="ALLOWED_FILE_TYPES"
                :max-size="MAX_FILE_SIZE"
                @selected="fileSelected"
                @cleared="fileCleared"
              />

              <FormMessage
                v-if="errors.file"
                :message="errors.file"
              />
            </FormField>

            <FormField
              id="cover"
              label="Cover"
              hint="Please write an optional cover letter"
            >
              <FormInput
                id="cover"
                v-model="cover"
                placeholder="Enter your cover letter"
                multi-line
              />

              <FormMessage
                v-if="errors.cover"
                :message="errors.cover"
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
  </div>
</template>
