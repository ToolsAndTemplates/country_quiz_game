'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import QuizContainer from '@/components/QuizContainer'
import { QuizQuestion } from '@/types/country'
import { generateCapitalQuestions } from '@/lib/countries'

export default function CapitalsQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadQuestions() {
      const generatedQuestions = await generateCapitalQuestions(10)
      setQuestions(generatedQuestions)
      setLoading(false)
    }
    loadQuestions()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-6xl"
        >
          🏛️
        </motion.div>
      </div>
    )
  }

  return (
    <QuizContainer
      questions={questions}
      title="Capital Cities"
      icon="🏛️"
      gradientColors="from-purple-500 to-pink-500"
      renderQuestion={(question, onAnswer) => (
        <div className="glass rounded-3xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              What is the capital of
            </h2>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="text-4xl md:text-5xl font-bold text-white mb-8 py-4 px-6 glass rounded-2xl inline-block"
            >
              {question.correct.name.common}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((country, idx) => (
              <motion.button
                key={country.cca3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAnswer(country.cca3 === question.correct.cca3)}
                className="glass p-6 rounded-2xl text-white font-semibold text-lg hover:bg-white/10 transition-all"
              >
                {country.capital?.[0] || 'No capital'}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    />
  )
}
