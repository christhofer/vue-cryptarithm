import { computed, ref } from 'vue'

export function useCryptarithm (question: string) {
  const lines = computed<string[]>(() => {
    return question.split(' ')
  })

  const letters = ref<string[]>(getLetters(question))
  const answers = ref<string[]>(letters.value.map(() => ''))
  const selectedLetter = ref<string>('')

  const validity = computed(() => check(question, answers.value))

  return {
    lines,
    letters,
    answers,
    selectedLetter,
    validity,
  }
}

const getLetters = (question: string) => {
  return [...new Set(question.replace(/[^A-Z]/g, '').split(''))]
}

const check = (question: string, answers: string[]): boolean => {
  if (answers.some(answer => answer === '')) { // still has unanswered letters
    return false
  }

  const letters = getLetters(question)
  const mapping: Record<string, string> = {}
  letters.forEach((letter, index) => {
    mapping[letter] = answers[index] as string
  })

  const [expression, result] = question.split('=')
    .map(part => part.trim().replace(/[A-Z]/g, (match) => mapping[match]!.toString()))

  if (expression === undefined || result === undefined) {
    return false
  }

  const expressionValue = expression
    .replace(/\s+/g, '') // remove space
    .match(/[+-]?\d+/g)! // split into terms
    .reduce<number>((sum, term) => sum + Number(term), 0)

  return expressionValue === Number(result)
}
