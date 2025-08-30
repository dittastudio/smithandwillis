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
    class="
      w-full
      border-0
      ring-0
      outline-1
      outline-current/20
      hover:outline-current/50
      -outline-offset-1
      focus:outline-current
      transition-colors
      duration-200
      ease-in-out
      px-4
      py-3
      text-14
      rounded-xs
    "
    :class="{ 'min-h-[180px] field-sizing-content': multiLine }"
    :value="modelValue"
    autocomplete="off"
    spellcheck="false"
    @input="onInput"
  />
</template>
