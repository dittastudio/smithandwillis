<script lang="ts" setup>
import type { BlockCareers } from '@@/.storyblok/types/332344/storyblok-components'

interface Props {
  block: BlockCareers
}

const { block } = defineProps<Props>()

const classesLinkHover = 'transition-opacity duration-300 ease-out opacity-100 hover:opacity-70'

const storyblokApi = useStoryblokApi()
// const route = useRoute()
// const routeQueryBrand = computed(() => route.query?.brand ?? null)
// const routeQueryDepartment = computed(() => route.query?.department ?? null)

const { data: brand } = await useAsyncData('brand', async () => await storyblokApi.get(`cdn/datasource_entries`, {
  datasource: 'career-brand',
}))

const { data: department } = await useAsyncData('department', async () => await storyblokApi.get(`cdn/datasource_entries`, {
  datasource: 'career-department',
}))

const jobs = computed(() => block.jobs
  .filter(item => typeof item !== 'string'),
  // .filter(job => (routeQueryBrand.value && job.content?.brand?.includes(routeQueryBrand.value as string)))
  // .filter(job => (routeQueryDepartment.value && job.content?.department?.includes(routeQueryDepartment.value as string))),
)

console.log('block', jobs.value)
</script>

<template>
  <div
    v-editable="block"
    class="block-careers wrapper flex flex-col gap-4 md:gap-6"
  >
    <h2
      v-if="block.headline"
      class="type-sans-large-caps text-balance"
    >
      {{ block.headline }}
    </h2>

    <pre>
      {{ brand }}
      {{ department }}
    </pre>

    <ul
      class="group grid grid-cols-1 md:grid-cols-2 gap-x-[var(--app-inner-gutter)]"
    >
      <li
        v-for="job in jobs"
        :key="job._uid"
        class="
          flex
          justify-between
          items-center
          border-b
          border-current/20
          pt-4
          pb-2
          transition-opacity
          duration-300
          ease-out
          opacity-100
          group-hover:[&:not(&:hover)]:opacity-50
        "
      >
        <div class="flex flex-col gap-y-0.5">
          <p
            v-if="job.name"
            class="type-sans-medium"
          >
            {{ job.name }}
          </p>

          <p
            v-if="job.content.brand"
            class="type-sans-medium-caps"
          >
            {{ job.content.brand }}
          </p>
        </div>

        <div class="flex gap-x-4 md:gap-x-6 lg:pr-6">
          <a
            v-if="job.content.pdf?.filename"
            :href="job.content.pdf.filename"
            target="_blank"
            rel="noopener noreferrer"
            class="type-mix-xsmall-caps p-2 -m-2 md:p-3 md:-m-3"
            :class="classesLinkHover"
          >
            View
          </a>

          <a
            v-if="job.content.email"
            :href="`mailto:${job.content.email}`"
            class="type-mix-xsmall-caps p-2 -m-2 md:p-3 md:-m-3"
            :class="classesLinkHover"
          >
            Apply
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>
