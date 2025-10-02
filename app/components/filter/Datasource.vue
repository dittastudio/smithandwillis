<script lang="ts" setup>
export interface Entry {
  id: number
  value: string
  name: string
}

interface Props {
  slug: string
  entries?: Entry[]
}

const { slug, entries = [] } = defineProps<Props>()
const route = useRoute()

const applied = computed(() => route.query[slug] ?? null)

const filters = computed(() => {
  const others = entries.map(entry => ({
    ...entry,
    to: {
      path: route.path,
      query: {
        ...route.query,
        [slug]: entry.value,
      },
    },
  }))

  const all = route.query
  const { [slug]: _, ...rest } = all

  return [
    {
      id: 1,
      value: null,
      name: 'All',
      to: {
        path: route.path,
        query: rest,
      },
    },
    ...others,
  ]
})
</script>

<template>
  <div class="@container">
    <ul class="flex flex-col gap-0.5 type-sans-medium text-14">
      <li
        v-for="filter in filters"
        :key="filter.id"
      >
        <NuxtLink
          :to="filter.to"
          class="opacity-50 hover:opacity-100 transition-opacity duration-200 ease-in-out no-underline"
          :class="[
            {
              'opacity-100': applied === filter.value || (!applied && !filter.value),
            },
          ]"
        >
          {{ filter.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
