import type { RichtextStoryblok } from '@/types/storyblok'
import type { LocationQuery } from 'vue-router'

const storyblokEditor = (search: LocationQuery) => '_storyblok' in search

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp']
const videoExtensions = ['mp4', 'webm', 'ogg']

const storyblokAssetType = (filename: string): 'image' | 'video' | 'other' => {
  if (typeof filename !== 'string' || !filename?.trim().length) {
    return 'other'
  }

  const ext = filename.split('.').pop() || ''

  if (imageExtensions.includes(ext)) {
    return 'image'
  }

  if (videoExtensions.includes(ext)) {
    return 'video'
  }

  return 'other'
}

const storyblokImageUrlUpdate = (url: string) => url.replace('//a.storyblok.com', '//a2.storyblok.com')

const storyblokImage = (
  filename: string | null | undefined,
  options?: App.ImageTransformOptions | undefined,
): string => {
  if (!filename?.length)
    return ''

  const settings: App.ImageTransformOptions = {
    width: 0,
    height: 0,
    smart: false, // Must be set to false if focal point is used
    quality: 80,
    blur: 0,
    focal: '',
    ...options,
  }

  const filterProperties: Record<string, string> = {
    blur: settings.blur && settings.blur > 0 ? `:blur(${settings.blur})` : '',
    quality: `:quality(${settings.quality})`,
    focal: settings.focal ? `:focal(${settings.focal})` : '',
  }

  const filters: string = Object.values(filterProperties)
    .map(item => item.trim())
    .filter(item => item.length)
    .join('')

  const transforms = `m/${settings.width}x${settings.height}${
    settings.smart ? '/smart' : ''
  }/filters${filters}`
  const path = storyblokImageUrlUpdate(`${filename}/${transforms}`)

  return path
}

const storyblokRichTextContent = (richtext: RichtextStoryblok | undefined): boolean => Boolean(richtext?.content?.[0]?.content?.length)

const storyblokSlug = (path: string): string =>
  ['/', ''].includes(path) ? '/home' : path.replace(/\/+$/, '')

const storyblokImageDimensions = (
  filename: string | null | undefined,
): { width: number, height: number } => {
  if (!filename?.length) {
    return {
      width: 0,
      height: 0,
    }
  }

  const [width, height] = filename.split('/')[5].split('x')

  return { width: Number(width), height: Number(height) }
}

export {
  storyblokAssetType,
  storyblokEditor,
  storyblokImage,
  storyblokImageDimensions,
  storyblokImageUrlUpdate,
  storyblokRichTextContent,
  storyblokSlug,
}
