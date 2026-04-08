<script setup lang="ts">
  import { useEventListener } from '@vueuse/core'

  const props = defineProps<{
    letterIndex: number,
  }>()

  const answers = defineModel<string[]>('answers', { required: true })

  const click = (number: number) => {
    answers.value[props.letterIndex] = number === 1 ? '' : (number - 2).toString()
  }

  useEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Backspace' || event.key === 'Delete') {
      return answers.value[props.letterIndex] = ''
    } else if (event.key >= '0' && event.key <= '9') {
      answers.value[props.letterIndex] = event.key
    }
  })
</script>

<template>
  <div class="flex gap-0.5 justify-center">
    <button
      v-for="i in 11"
      :key="i"
      type="button"
      class="cursor-pointer"
      :class="{
        'selected': answers.some(answer => answer === (i - 2).toString())
      }"
      @click="click(i)">
      <template v-if="i > 1">
        {{ i - 2 }}
      </template>
    </button>
  </div>
</template>

<style scoped>
    @reference "@/assets/styles/main.css";

    button {
      @apply inline-block rounded bg-gray-700 text-white w-6 h-8;
    }
    button.selected {
      @apply bg-gray-200;
    }
</style>
