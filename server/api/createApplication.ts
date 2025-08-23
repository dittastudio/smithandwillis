import { Buffer } from 'node:buffer'
import { createReadStream } from 'node:fs'
import { unlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import DOMPurify from 'dompurify'
import FormData from 'form-data'
import { JSDOM } from 'jsdom'
import { z } from 'zod'

const MAX_FILE_SIZE = 500 * 1024 // 500KB
const ALLOWED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

const clean = (raw?: string): string => {
  if (!raw) {
    return ''
  }

  const window = new JSDOM('').window
  const purify = DOMPurify(window)
  const cleaned = purify.sanitize(raw, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  })

  return cleaned.trim()
}

const getFileExtension = (filename: string): string => {
  const parts = filename.split('.')
  return parts.length > 1 ? parts.pop()?.toLowerCase() || '' : ''
}

export default defineEventHandler(async (event) => {
  const formDataArray = await readMultipartFormData(event)

  try {
    if (!formDataArray) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No field data found.',
      })
    }

    const formData = formDataArray.reduce((acc, item) => {
      if (item.name === 'file' && item.filename) {
        acc.file = new File([item.data], item.filename, {
          type: item.type || 'application/octet-stream',
        })
      }
      else if (item.name && typeof item.data !== 'undefined') {
        acc[item.name] = item.data.toString()
      }

      return acc
    }, {} as { [key: string]: string | File })

    const cleaned = {
      name: typeof formData.name === 'string' ? clean(formData.name) : '',
      email: typeof formData.email === 'string' ? clean(formData.email) : '',
      file: formData.file instanceof File ? formData.file : undefined,
      metadata: typeof formData.metadata === 'string' ? JSON.parse(formData.metadata) : undefined,
      cover: typeof formData.cover === 'string' ? clean(formData.cover) : '',
    }

    const validationSchema = z.object({
      name: z
        .string()
        .trim()
        .min(1, 'Name is required')
        .max(50, 'Name must be less than 50 characters')
        .regex(/^[a-z\s\-'.]+$/i, 'Name contains invalid characters'),
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
    })

    const validation = validationSchema.safeParse(cleaned)

    if (!validation.success) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Content validation failed.',
      })
    }

    const config = useRuntimeConfig()
    const uuid = crypto.randomUUID()
    let fileUrl: string | undefined
    let fileId: string | undefined

    if (cleaned.file && cleaned.file instanceof File) {
      const tmpPath = join(tmpdir(), `${uuid}.${getFileExtension(cleaned.file.name)}`)
      await writeFile(tmpPath, Buffer.from(await cleaned.file.arrayBuffer()))

      console.log(`${uuid}.${getFileExtension(cleaned.file.name)}`)
    }

    // if (cleaned.file && cleaned.file instanceof File) {
    //   const tmpPath = join(tmpdir(), `${uuid}.${getFileExtension(cleaned.file.name)}`)
    //   await writeFile(tmpPath, Buffer.from(await cleaned.file.arrayBuffer()))

    //   const metadata = cleaned.metadata
    //     ? {
    //         width: cleaned.metadata?.width || 500,
    //         height: cleaned.metadata?.height || 500,
    //       }
    //     : {
    //         width: 500,
    //         height: 500,
    //       }

    //   // 1. Request signed upload object.
    //   const signedRes = await $fetch<any>(`https://api.storyblok.com/v1/spaces/${config.STORYBLOK_SPACE_ID}/assets/`, {
    //     method: 'POST',
    //     headers: {
    //       Authorization: config.STORYBLOK_MANAGEMENT_TOKEN,
    //     },
    //     body: {
    //       filename: `${uuid}.${getFileExtension(cleaned.file.name)}`,
    //       size: `${metadata.width}x${metadata.height}`,
    //       validate_upload: 1,
    //       asset_folder_id: config.STORYBLOK_GUESTBOOK_ASSET_FOLDER_ID,
    //     },
    //   })

    //   // 2. Upload file to S3.
    //   const form = new FormData()
    //   Object.entries(signedRes.fields).forEach(([k, v]) => form.append(k, v))
    //   form.append('file', createReadStream(tmpPath))

    //   await new Promise<void>((resolve, reject) => {
    //     form.submit(signedRes.post_url, (err, res) => {
    //       if (err || res.statusCode !== 204)
    //         return reject(err || new Error('Upload failed'))
    //       res.resume()
    //       resolve()
    //     })
    //   })

    //   // 3. Finalize upload.
    //   await $fetch(`https://api.storyblok.com/v1/spaces/${config.STORYBLOK_SPACE_ID}/assets/${signedRes.id}/finish_upload`, {
    //     method: 'GET',
    //     headers: {
    //       Authorization: config.STORYBLOK_MANAGEMENT_TOKEN,
    //     },
    //   })

    //   // Final file payload that will be passed to Storyblok (below).
    //   fileId = signedRes.id
    //   fileUrl = `https://a.storyblok.com/${signedRes.fields.key}`

    //   await unlink(tmpPath)
    // }

    // const postStory = await fetch(`https://api.storyblok.com/v1/spaces/${config.STORYBLOK_SPACE_ID}/stories`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': config.STORYBLOK_MANAGEMENT_TOKEN,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     publish: false,
    //     story: {
    //       name: `Entry: ${validation.data.name}, ${validation.data.email}`,
    //       slug: `entry-${uuid}`,
    //       is_startpage: false,
    //       parent_id: config.STORYBLOK_GUESTBOOK_STORY_FOLDER_ID,
    //       content: {
    //         component: 'entry',
    //         file: {
    //           id: fileId || null,
    //           alt: '',
    //           name: '',
    //           focus: null,
    //           title: null,
    //           source: null,
    //           filename: fileUrl || '',
    //           copyright: null,
    //           fieldtype: 'asset',
    //           meta_data: {
    //             alt: '',
    //             title: null,
    //             source: null,
    //             copyright: null,
    //           },
    //         },
    //         cover: validation.data.cover,
    //         name: validation.data.name,
    //         email: validation.data.email,
    //       },
    //     },
    //   }),
    // })

    // if (!postStory.ok) {
    //   console.error('Storyblok API error:', await postStory.text())

    //   throw createError({
    //     statusCode: 500,
    //     statusMessage: `Please check the form and try again.`,
    //   })
    // }

    return {
      statusCode: 200,
      statusMessage: 'Entry created successfully.',
    }
  }
  catch (error) {
    console.error('Error creating entry:', error)

    return {
      statusCode: 500,
      statusMessage: 'Please check the form and try again.',
    }
  }
})
