<script lang="ts" setup>
import type { BlockCareers } from '@@/.storyblok/types/332344/storyblok-components'

interface Props {
  block: BlockCareers
}

const { block } = defineProps<Props>()

const classesLinkHover = 'transition-opacity duration-300 ease-out opacity-100 hover:opacity-70'

const storyblokApi = useStoryblokApi()
const route = useRoute()
const routeQueryBrand = computed(() => route.query?.brand ?? null)
const routeQueryDepartment = computed(() => route.query?.department ?? null)

const listKey = computed(() => `${String(routeQueryBrand.value ?? 'all')}|${String(routeQueryDepartment.value ?? 'all')}`)

const { data: brand } = await useAsyncData('brand', async () => await storyblokApi.get(`cdn/datasource_entries`, {
  datasource: 'brand',
}))

const { data: department } = await useAsyncData('department', async () => await storyblokApi.get(`cdn/datasource_entries`, {
  datasource: 'department',
}))

const jobs = computed(() => {
  const items = block.jobs.filter(item => typeof item !== 'string')
  const brandQ = routeQueryBrand.value
  const deptQ = routeQueryDepartment.value

  if (!brandQ && !deptQ) {
    return items
  }

  const normalize = (v: unknown) => {
    if (v == null) {
      return null
    }

    if (Array.isArray(v)) {
      return v.map(String)
    }

    return [String(v)]
  }

  const brandFilters = normalize(brandQ)
  const deptFilters = normalize(deptQ)

  const matches = (field: any, filters: string[] | null) => {
    if (!filters) {
      return true
    }

    if (field == null) {
      return false
    }

    const values = Array.isArray(field) ? field.map(String) : [String(field)]

    return filters.some(f => values.includes(f))
  }

  return items.filter(job => (
    matches(job.content?.brand, brandFilters) && matches(job.content?.department, deptFilters)
  ))
})
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

    <div class="group grid grid-cols-1 md:grid-cols-12 gap-[var(--app-inner-gutter)]">
      <div class="md:col-span-3 xl:col-span-2 flex flex-col gap-4 md:gap-6 md:pt-4">
        <FilterDatasource
          v-if="brand?.data.datasource_entries.length"
          slug="brand"
          :entries="brand.data.datasource_entries"
        />

        <FilterDatasource
          v-if="department?.data.datasource_entries.length"
          slug="department"
          :entries="department.data.datasource_entries"
        />
      </div>

      <Transition
        name="fade"
        mode="out-in"
      >
        <ul
          :key="listKey"
          class="md:col-span-9 xl:col-span-10 group flex flex-col gap-x-[var(--app-inner-gutter)]"
        >
          <li
            v-for="job in jobs"
            :key="job.id"
            class="
          flex
          justify-between
          items-center
          border-b
          border-current/20
          py-4
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

              <UiModal v-if="job.content.email">
                <template #trigger>
                  <span
                    class="block type-mix-xsmall-caps p-2 -m-2 md:p-3 md:-m-3"
                    :class="classesLinkHover"
                  >
                    Apply
                  </span>
                </template>

                <JobApplication :headline="`Apply for ${job.name}${job.content.brand ? ` at ${job.content.brand}` : ``}`" />
              </UiModal>
            </div>
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>
