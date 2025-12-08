import { Country, QuizQuestion } from '@/types/country'

const COUNTRIES_API = 'https://restcountries.com/v3.1/all'

let cachedCountries: Country[] | null = null

export async function fetchCountries(): Promise<Country[]> {
  if (cachedCountries) {
    return cachedCountries
  }

  try {
    const response = await fetch(COUNTRIES_API)
    const data = await response.json()

    // Filter out countries without essential data
    cachedCountries = data.filter((country: Country) =>
      country.name?.common &&
      country.flags?.png &&
      country.population > 0
    )

    return cachedCountries || []
  } catch (error) {
    console.error('Error fetching countries:', error)
    return []
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export function getRandomCountries(countries: Country[], count: number): Country[] {
  const shuffled = shuffleArray(countries)
  return shuffled.slice(0, count)
}

export async function generateFlagQuestions(numberOfQuestions: number = 10): Promise<QuizQuestion[]> {
  const countries = await fetchCountries()
  const questions: QuizQuestion[] = []

  const selectedCountries = getRandomCountries(countries, numberOfQuestions)

  for (const correct of selectedCountries) {
    const wrongOptions = getRandomCountries(
      countries.filter(c => c.cca3 !== correct.cca3),
      3
    )

    const options = shuffleArray([correct, ...wrongOptions])

    questions.push({
      correct,
      options,
      type: 'flag'
    })
  }

  return questions
}

export async function generateCapitalQuestions(numberOfQuestions: number = 10): Promise<QuizQuestion[]> {
  const countries = await fetchCountries()
  const countriesWithCapitals = countries.filter(c => c.capital && c.capital.length > 0)
  const questions: QuizQuestion[] = []

  const selectedCountries = getRandomCountries(countriesWithCapitals, numberOfQuestions)

  for (const correct of selectedCountries) {
    const wrongOptions = getRandomCountries(
      countriesWithCapitals.filter(c => c.cca3 !== correct.cca3),
      3
    )

    const options = shuffleArray([correct, ...wrongOptions])

    questions.push({
      correct,
      options,
      type: 'capital'
    })
  }

  return questions
}

export async function generatePopulationQuestions(numberOfQuestions: number = 10): Promise<QuizQuestion[]> {
  const countries = await fetchCountries()
  const questions: QuizQuestion[] = []

  const selectedCountries = getRandomCountries(countries, numberOfQuestions * 2)

  for (let i = 0; i < numberOfQuestions; i++) {
    const [country1, country2] = selectedCountries.slice(i * 2, i * 2 + 2)
    const correct = country1.population > country2.population ? country1 : country2
    const options = [country1, country2]

    questions.push({
      correct,
      options,
      type: 'population'
    })
  }

  return questions
}

export function formatPopulation(population: number): string {
  if (population >= 1_000_000_000) {
    return `${(population / 1_000_000_000).toFixed(1)}B`
  } else if (population >= 1_000_000) {
    return `${(population / 1_000_000).toFixed(1)}M`
  } else if (population >= 1_000) {
    return `${(population / 1_000).toFixed(1)}K`
  }
  return population.toString()
}
