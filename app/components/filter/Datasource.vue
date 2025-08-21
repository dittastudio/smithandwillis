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
  <ul>
    <li
      v-for="filter in filters"
      :key="filter.id"
    >
      <NuxtLink :to="filter.to">
        {{ filter.name }}
      </NuxtLink>
    </li>
  </ul>
</template>
