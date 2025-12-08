'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import QuizContainer from '@/components/QuizContainer'
import { QuizQuestion } from '@/types/country'
import { generatePopulationQuestions, formatPopulation } from '@/lib/countries'

export default function PopulationQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadQuestions() {
      const generatedQuestions = await generatePopulationQuestions(10)
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
          👥
        </motion.div>
      </div>
    )
  }

  return (
    <QuizContainer
      questions={questions}
      title="Population Quiz"
      icon="👥"
      gradientColors="from-orange-500 to-red-500"
      renderQuestion={(question, onAnswer) => (
        <div className="glass rounded-3xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Which country has a larger population?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {question.options.map((country, idx) => (
              <motion.button
                key={country.cca3}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAnswer(country.cca3 === question.correct.cca3)}
                className="glass p-8 rounded-3xl hover:bg-white/10 transition-all"
              >
                <div className="text-5xl mb-4">
                  {idx === 0 ? '🌍' : '🌎'}
                </div>
                <div className="text-3xl font-bold text-white mb-4">
                  {country.name.common}
                </div>
                <div className="inline-block px-6 py-3 bg-white/10 rounded-full">
                  <div className="text-sm text-white/70 mb-1">Population</div>
                  <div className="text-2xl font-bold text-white">
                    {formatPopulation(country.population)}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 text-white/60 text-sm"
          >
            💡 Tip: Consider the country&apos;s size and development
          </motion.div>
        </div>
      )}
    />
  )
}
