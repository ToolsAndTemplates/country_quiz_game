'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import QuizContainer from '@/components/QuizContainer'
import { QuizQuestion } from '@/types/country'
import { generateFlagQuestions } from '@/lib/countries'

export default function FlagsQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadQuestions() {
      try {
        const generatedQuestions = await generateFlagQuestions(10)
        if (generatedQuestions.length === 0) {
          setError(true)
        } else {
          setQuestions(generatedQuestions)
        }
      } catch (err) {
        console.error('Error loading questions:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
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
          🌍
        </motion.div>
      </div>
    )
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass rounded-3xl p-8 max-w-md text-center"
        >
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h2>
          <p className="text-white/80 mb-6">
            We couldn&apos;t load the quiz questions. Please check your internet connection and try again.
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold"
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <QuizContainer
      questions={questions}
      title="Flag Master"
      icon="🚩"
      gradientColors="from-blue-500 to-cyan-500"
      quizMode="flags"
      renderQuestion={(question, onAnswer) => (
        <div className="glass rounded-3xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Which country does this flag belong to?
            </h2>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-md mx-auto h-48 mb-8 rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                src={question.correct.flags.png}
                alt="Country flag"
                fill
                className="object-cover"
                priority
              />
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
                {country.name.common}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    />
  )
}
