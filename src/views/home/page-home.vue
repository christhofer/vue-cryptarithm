<script setup lang="ts">
  import { useCryptarithm } from '@/models/question'
  import ComponentButtonNumber from './component-button-number.vue'

  const {
    lines,
    answers,
    letters,
    validity,
    selectedLetter,
  } = useCryptarithm('SMART + KIND = AARON')
  // } = useCryptarithm('TO + DO = OFT')
  // } = useCryptarithm('SEND + MORE = MONEY')
</script>

<template>
  <div
    class="page-wrapper h-full flex flex-col gap-16 w-80 mt-[45vh]"
    :class="{'solved': validity}">
    <div class="relative pl-8 mx-auto text-4xl font-black">
      <div
        v-for="(line, index) in lines"
        :key="index">
        <div
          class="py-0.5"
          :class="{
            'text-right': index % 2 === 0,
            'absolute left-0 -translate-y-1/2': index % 2 === 1,
            'border-t-4': index === lines.length - 1,
          }">
          <template v-if="index % 2 === 1">
            {{ line }}
          </template>
          <div
            v-else
            class="flex justify-end">
            <button
              v-for="(letter, i) in line.split('')"
              :key="i"
              class="w-9 h-14 cursor-pointer"
              :class="{
                'letter-selected': selectedLetter === letter
              }"
              type="button"
              @click="selectedLetter = selectedLetter === letter ? '' : letter">
              <template v-if="answers[letters.indexOf(letter)]">
                {{ answers[letters.indexOf(letter)] }}
              </template>
              <template v-else>
                {{ letter }}
              </template>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-8">
      <div class="flex justify-center -space-x-0.5 font-bold">
        <button
          v-for="(letter, index) in letters"
          :key="letter"
          type="button"
          class="flex flex-col items-center -space-y-0.5 cursor-pointer"
          :class="{
            'letter-selected': selectedLetter === letter
          }"
          @click="selectedLetter = selectedLetter === letter ? '' : letter">
          <div class="border-2 w-7 h-10 flex items-center justify-center">
            {{ letter }}
          </div>
          <div class="border-2 w-7 h-10 flex items-center justify-center">
            {{ answers[index] }}
          </div>
        </button>
      </div>

      <component-button-number
        v-if="selectedLetter && !validity"
        v-model:answers="answers"
        :letter-index="letters.indexOf(selectedLetter)" />
    </div>

    <div
      v-if="validity"
      class="text-center">
      You solved the puzzle! 🎉
    </div>
  </div>
</template>

<style scoped>
  @reference "@/assets/styles/main.css";

  .solved {
    @apply pointer-events-none;
  }
  .page-wrapper:not(.solved) .letter-selected {
    @apply bg-yellow-300;
  }
</style>
