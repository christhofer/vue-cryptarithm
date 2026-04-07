<script setup lang="ts">
  import { useCryptarithm } from '@/models/question'
  // import ComponentAnswer from './component-answer.vue'
  // import ComponentButtonNumber from './component-button-number.vue'
  // import ComponentQuestion from './component-question.vue'

  const {
    lines,
    question,
    setAnswer,
    answers,
    letters,
    validity,
  } = useCryptarithm('TO + DO = OFT')
  // } = useCryptarithm('SEND + MORE = MONEY')
</script>

<template>
  <div class="h-full flex flex-col justify-center gap-16 w-80">
    <!-- <div class="flex-1 flex items-center justify-center border">
      <component-question />
    </div>

    <div class="h-64 border flex flex-col gap-4 items-center justify-center">
      <component-answer />
    </div> -->

    <div class="relative pl-8 mx-auto w-32">
      <div
        v-for="(line, index) in lines"
        :key="index">
        <div
          :class="{
            'text-right': index % 2 === 0,
            'absolute left-0 -translate-y-1/2': index % 2 === 1,
            'border-t': index === lines.length - 1,
          }">
          {{ line }}
        </div>
      </div>
    </div>

    <div class="flex gap-2 justify-center">
      <div
        v-for="(letter, index) in letters"
        :key="letter"
        class="flex flex-col items-center gap-2">
        <div>{{ letter }}</div>
        <div>
          <input
            v-model="answers[index]"
            type="text"
            maxlength="1"
            class="w-6 text-center border">
        </div>
      </div>
    </div>

    <!-- <component-button-number /> -->

    <div
      v-if="validity === 'Valid'"
      class="text-center">
      You solved the puzzle! 🎉
    </div>
  </div>
</template>
