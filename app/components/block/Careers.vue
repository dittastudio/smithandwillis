<script lang="ts" setup>
import type { BlockCareers } from '@@/.storyblok/types/332344/storyblok-components'
import type { ISbResult } from '@storyblok/js'
import { ListFilter } from 'lucide-vue-next'

interface Props {
  block: BlockCareers
}

const { block } = defineProps<Props>()

const classesLinkHover = 'transition-opacity duration-300 ease-out group-hover/link:not-hover:opacity-70'
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

  const matches = (field: string | number | string[], filters: string[] | null) => {
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

const getDatasourceName = (datasource: ISbResult | undefined, key: string | number) => {
  const entry = datasource?.data.datasource_entries.find((entry: { name: string, value: string }) => entry.value === key)

  return entry?.name ?? null
}

const scrollAnchor = ref<HTMLElement>()
const { scrollMarginTop } = useCentreAnchor(scrollAnchor, 150)

const isScreenMd = useAtMedia(`(min-width: 800px)`)
const isFiltersOpen = ref(false)

watchEffect(() => {
  isFiltersOpen.value = isScreenMd.value
})
</script>

<template>
  <div
    :id="block.anchor_id ? safeKebabCase(block.anchor_id) : undefined"
    ref="scrollAnchor"
    v-editable="block"
    :style="scrollMarginTop"
    class="wrapper"
  >
    <div class="grid grid-cols-1 md:grid-cols-12 gap-[var(--app-inner-gutter)]">
      <div
        v-if="block.headline"
        class="md:col-start-4 md:-col-end-1 md:row-start-1 xl:col-start-3"
      >
        <h2 class="type-sans-large-caps text-balance">
          {{ block.headline }}
        </h2>
      </div>

      <div class="md:col-span-3 md:row-start-2 xl:col-span-2 flex flex-col gap-4 md:gap-6 md:pt-4.5">
        <button
          type="button"
          class="type-sans-medium text-14 flex items-center justify-start gap-4 md:hidden"
          @click="isFiltersOpen = !isFiltersOpen"
        >
          {{ isFiltersOpen ? 'Close filters' : 'Filter jobs' }} <ListFilter class="size-3 text-inherit" />
        </button>

        <UiExpandCollapse :is-open="isFiltersOpen">
          <div class="flex flex-col gap-4 md:gap-6">
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
        </UiExpandCollapse>
      </div>

      <div class="md:col-span-9 md:row-start-2 xl:col-span-10">
        <p
          v-if="!jobs.length"
          class="type-sans-medium pt-4"
        >
          No opportunities found
          <template v-if="getDatasourceName(brand, String(routeQueryBrand))">
            at <strong class="font-mix font-bold tracking-sm">{{ getDatasourceName(brand, String(routeQueryBrand)) }}</strong>
          </template>

          <template v-if="getDatasourceName(department, String(routeQueryDepartment))">
            in <strong class="font-mix font-bold tracking-sm">{{ getDatasourceName(department, String(routeQueryDepartment)) }}</strong>.
          </template>
        </p>

        <Transition
          v-if="jobs.length"
          name="fade-quick"
          mode="out-in"
        >
          <ul
            :key="listKey"
            class="group/list flex flex-col gap-x-[var(--app-inner-gutter)]"
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
                group-hover/list:not-hover:opacity-50
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
                  {{ getDatasourceName(brand, job.content.brand) }}
                </p>
              </div>

              <div class="group/link flex gap-x-4 md:gap-x-6 lg:pr-6">
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

                  <JobApplication
                    :legend="`Apply for ${job.name}${getDatasourceName(brand, job.content.brand) ? ` at ${getDatasourceName(brand, job.content.brand)}` : ``}`"
                    :headline="`Apply for ${job.name}${getDatasourceName(brand, job.content.brand) ? ` at ${getDatasourceName(brand, job.content.brand)}` : ``}`"
                    :job-title="`${job.name}${getDatasourceName(brand, job.content.brand) ? ` at ${getDatasourceName(brand, job.content.brand)}` : ``}`"
                    :job-email="job.content.email"
                  />
                </UiModal>
              </div>
            </li>
          </ul>
        </Transition>
      </div>
    </div>
  </div>
</template>
