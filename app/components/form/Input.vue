<script lang="ts" setup>
interface Props {
  id?: string
  multiLine?: boolean
  field?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'month'
    | 'number'
    | 'password'
    | 'range'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
}

const { multiLine = false, id = '', field = 'text' } = defineProps<Props>()
const modelValue = defineModel<string>()

const onInput = (event: Event) => {
  modelValue.value = (event.target as HTMLInputElement).value
}
</script>

<template>
  <Component
    :is="multiLine ? 'textarea' : 'input'"
    :id="id"
    :type="field && !multiLine ? field : null"
    :class="[
      'w-full border-0 ring-0 outline-1 outline-black/10 focus:outline-black transition-colors duration-500 ease-outQuint px-4 py-3 text-14 rounded-none',
      { 'min-h-[180px]': multiLine },
    ]"
    :value="modelValue"
    autocomplete="off"
    spellcheck="false"
    @input="onInput"
  />
</template>
