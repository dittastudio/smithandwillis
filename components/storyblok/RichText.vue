<script lang="ts">
import schema from 'storyblok-js-client/schema'
import VRuntimeTemplate from 'vue3-runtime-template'
import type { RichtextStoryblok } from '@/types/storyblok'
import { NuxtLink } from '#components'

// WARNING: 'vue3-runtime-template' requires Options API.
// We must also expose NuxtLink component to the template.
// We disable also the 'vue/no-unused-components' rule for NuxtLink.

export default defineComponent({
  components: {
    VRuntimeTemplate,
    NuxtLink, // eslint-disable-line vue/no-unused-components
  },
  props: {
    content: {
      type: Object as () => RichtextStoryblok,
      required: false,
    },
  },
  data() {
    return {
      schema: {
        ...schema,
        marks: {
          ...schema.marks,
          link(node: any) {
            const attrs = { ...node.attrs }
            const { linktype = 'url' } = node.attrs

            if (linktype === 'email') {
              attrs.href = `mailto:${attrs.href}`
            }

            if (attrs.anchor) {
              attrs.href = `${attrs.href}#${attrs.anchor}`
              delete attrs.anchor
            }

            if (linktype === 'story') {
              attrs.to = `${attrs.href}`
              delete attrs.href
            }

            return {
              tag: [
                {
                  tag: 'nuxt-link',
                  attrs,
                },
              ],
            }
          },
        },
      },
    }
  },
  computed: {
    html() {
      return this.content ? renderRichText(this.content, { schema: this.schema }) : ''
    },
  },
})
</script>

<template>
  <div>
    <VRuntimeTemplate :template="html" />
  </div>
</template>
