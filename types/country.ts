export interface Country {
  name: {
    common: string
    official: string
  }
  capital?: string[]
  population: number
  flags: {
    png: string
    svg: string
    alt?: string
  }
  region: string
  subregion?: string
  languages?: { [key: string]: string }
  area: number
  cca2: string
  cca3: string
}

export interface QuizQuestion {
  correct: Country
  options: Country[]
  type: 'flag' | 'capital' | 'population'
}

export interface QuizState {
  questions: QuizQuestion[]
  currentQuestion: number
  score: number
  answers: boolean[]
  isComplete: boolean
}
