import { Resend } from 'resend'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const MAX_FILE_SIZE = 500 * 1024 // 500 KB
  const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]

  const config = useRuntimeConfig()
  const resend = new Resend(config.RESEND_API_KEY)
  const form = await readMultipartFormData(event)

  if (!form) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid form data',
    })
  }

  const name = form.find(f => f.name === 'name')?.data?.toString() ?? ''
  const email = form.find(f => f.name === 'email')?.data?.toString() ?? ''
  const cover = form.find(f => f.name === 'cover')?.data?.toString() ?? ''
  const file = form.find(f => f.name === 'file')

  if (!file) {
    throw createError({
      statusCode: 400,
      statusMessage: 'File is required',
    })
  }

  const serverValidationSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .max(50, 'Name must be less than 50 characters'),
    email: z
      .email('Invalid email')
      .trim(),
    cover: z
      .string()
      .trim()
      .max(1000, 'Cover must be less than 1000 characters'),
    file: z.object({
      filename: z.string(),
      type: z.string().refine(type => ALLOWED_FILE_TYPES.includes(type), 'File must be a PDF or Word document'),
      size: z.number().max(MAX_FILE_SIZE, 'File must be less than 500KB'),
      data: z.instanceof(Buffer),
    }),
  })

  const validationResult = serverValidationSchema.safeParse({
    name,
    email,
    cover,
    file: {
      filename: file.filename ?? 'attachment',
      type: file.type ?? 'application/octet-stream',
      size: file.data.length,
      data: file.data,
    },
  })

  if (!validationResult.success) {
    const errors = validationResult.error.flatten().fieldErrors

    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: errors,
    })
  }

  const validated = validationResult.data
  const fileBase64 = validated.file.data.toString('base64')

  const response = await resend.emails.send({
    from: 'Smith & Willis <hello@smithandwillis.london>',
    to: 'michael@ditta.studio',
    subject: 'New Job Application',
    html: `
      <p><strong>Name:</strong> ${validated.name}</p>
      <p><strong>Email:</strong> ${validated.email}</p>
      <p><strong>Cover:</strong> ${validated.cover}</p>
    `,
    attachments: [
      {
        filename: validated.file.filename,
        content: fileBase64,
        contentType: validated.file.type,
      },
    ],
  })

  if (response.error) {
    console.log('response error', response.error)

    const err = response.error as {
      statusCode?: number
      message?: string
      error?: string
    }

    throw createError({
      statusCode: err?.statusCode ?? 500,
      statusMessage: err?.message ?? err?.error ?? 'Failed to send email.',
      data: err,
    })
  }

  return {
    statusCode: 200,
    statusMessage: 'Application created successfully.',
  }
})
