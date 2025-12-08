// Local storage utilities for game state

export interface GameStats {
  totalGames: number
  totalScore: number
  highScores: {
    flags: number
    capitals: number
    population: number
  }
  currentStreak: number
  bestStreak: number
  achievements: string[]
  lastPlayedDate: string
}

const STORAGE_KEY = 'country-quiz-stats'

export function getGameStats(): GameStats {
  if (typeof window === 'undefined') {
    return getDefaultStats()
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading game stats:', error)
  }

  return getDefaultStats()
}

export function saveGameStats(stats: GameStats): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  } catch (error) {
    console.error('Error saving game stats:', error)
  }
}

export function updateGameStats(
  mode: 'flags' | 'capitals' | 'population',
  score: number,
  totalQuestions: number,
  correctAnswersInRow: number
): GameStats {
  const stats = getGameStats()
  const today = new Date().toDateString()

  // Update totals
  stats.totalGames += 1
  stats.totalScore += score

  // Update high score for this mode
  if (score > stats.highScores[mode]) {
    stats.highScores[mode] = score
  }

  // Update streak
  if (stats.lastPlayedDate === today) {
    stats.currentStreak = Math.max(stats.currentStreak, correctAnswersInRow)
  } else {
    stats.currentStreak = correctAnswersInRow
    stats.lastPlayedDate = today
  }

  if (stats.currentStreak > stats.bestStreak) {
    stats.bestStreak = stats.currentStreak
  }

  // Check for new achievements
  const newAchievements = checkAchievements(stats, score, totalQuestions)
  newAchievements.forEach(achievement => {
    if (!stats.achievements.includes(achievement)) {
      stats.achievements.push(achievement)
    }
  })

  saveGameStats(stats)
  return stats
}

function getDefaultStats(): GameStats {
  return {
    totalGames: 0,
    totalScore: 0,
    highScores: {
      flags: 0,
      capitals: 0,
      population: 0
    },
    currentStreak: 0,
    bestStreak: 0,
    achievements: [],
    lastPlayedDate: new Date().toDateString()
  }
}

function checkAchievements(stats: GameStats, score: number, totalQuestions: number): string[] {
  const achievements: string[] = []

  // Perfect score
  if (score === totalQuestions) {
    achievements.push('perfect')
  }

  // First game
  if (stats.totalGames === 1) {
    achievements.push('first-game')
  }

  // 10 games played
  if (stats.totalGames >= 10) {
    achievements.push('veteran')
  }

  // 50 games played
  if (stats.totalGames >= 50) {
    achievements.push('expert')
  }

  // Streak achievements
  if (stats.currentStreak >= 5) {
    achievements.push('streak-5')
  }
  if (stats.currentStreak >= 10) {
    achievements.push('streak-10')
  }

  // High score achievements
  if (score >= 8) {
    achievements.push('scholar')
  }
  if (score >= 9) {
    achievements.push('genius')
  }

  return achievements
}

export const ACHIEVEMENTS = {
  'first-game': {
    id: 'first-game',
    name: 'First Steps',
    description: 'Complete your first quiz',
    icon: '🎯'
  },
  'perfect': {
    id: 'perfect',
    name: 'Perfect Score',
    description: 'Get 100% in a quiz',
    icon: '🏆'
  },
  'veteran': {
    id: 'veteran',
    name: 'Veteran',
    description: 'Complete 10 quizzes',
    icon: '🎖️'
  },
  'expert': {
    id: 'expert',
    name: 'Expert',
    description: 'Complete 50 quizzes',
    icon: '👑'
  },
  'streak-5': {
    id: 'streak-5',
    name: 'On Fire',
    description: 'Get 5 correct answers in a row',
    icon: '🔥'
  },
  'streak-10': {
    id: 'streak-10',
    name: 'Unstoppable',
    description: 'Get 10 correct answers in a row',
    icon: '⚡'
  },
  'scholar': {
    id: 'scholar',
    name: 'Scholar',
    description: 'Score 8 or more in a quiz',
    icon: '📚'
  },
  'genius': {
    id: 'genius',
    name: 'Genius',
    description: 'Score 9 or more in a quiz',
    icon: '🧠'
  }
}
