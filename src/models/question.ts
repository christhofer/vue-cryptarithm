import { computed, ref } from 'vue'

const questions = [
  'SEND + MORE = MONEY',
]

export function useCryptarithm (question: string) {
  const lines = computed<string[]>(() => {
    return question.split(' ').map(part => {
      if (['+', '='].includes(part)) {
        return part
      }

      letters.value.forEach((letter, index) => {
        if (answers.value[index]) {
          part = part.replaceAll(letter, answers.value[index].toString())
        }
      })

      return part
    })
  })

  const letters = ref<string[]>(getLetters(question))
  const answers = ref<string[]>(letters.value.map(() => ''))

  const setAnswer = (letter: string, number: string) => {
    const index = letters.value.indexOf(letter)
    answers.value[index] = number
  }

  const validity = computed(() => check(question, answers.value))

  return {
    lines,
    letters,
    answers,
    question,
    setAnswer,
    validity,
  }
}

const getLetters = (question: string) => {
  return [...new Set(question.replace(/[^A-Z]/g, '').split(''))]
}

const check = (question: string, answers: string[]): string => {
  if (answers.some(answer => answer === '')) {
    return 'Incomplete'
  }

  const letters = getLetters(question)
  const mapping: Record<string, string> = {}
  letters.forEach((letter, index) => {
    mapping[letter] = answers[index] as string
  })

  const [expression, result] = question.split('=')
    .map(part => part.trim().replace(/[A-Z]/g, (match) => mapping[match]!.toString()))

  const isValid = eval(expression as string) === Number(result)
  return isValid ? 'Valid' : 'Invalid'
}
