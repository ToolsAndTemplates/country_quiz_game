'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { QuizQuestion } from '@/types/country'

interface QuizContainerProps {
  questions: QuizQuestion[]
  title: string
  icon: string
  gradientColors: string
  renderQuestion: (question: QuizQuestion, onAnswer: (isCorrect: boolean) => void) => React.ReactNode
}

export default function QuizContainer({
  questions,
  title,
  icon,
  gradientColors,
  renderQuestion
}: QuizContainerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false)

  const handleAnswer = (isCorrect: boolean) => {
    setLastAnswerCorrect(isCorrect)
    setShowFeedback(true)
    setAnswers([...answers, isCorrect])

    if (isCorrect) {
      setScore(score + 1)
    }

    setTimeout(() => {
      setShowFeedback(false)
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setIsComplete(true)
      }
    }, 1500)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setAnswers([])
    setIsComplete(false)
    setShowFeedback(false)
  }

  const percentage = Math.round((score / questions.length) * 100)

  if (isComplete) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-8xl mb-6"
          >
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎉' : percentage >= 40 ? '👍' : '📚'}
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Quiz Complete!
          </h2>

          <div className="mb-8">
            <div className="text-7xl font-bold text-white mb-2">
              {score}/{questions.length}
            </div>
            <div className="text-2xl text-white/80">
              {percentage}% Correct
            </div>
          </div>

          <div className="mb-8">
            <div className="text-white/90 text-lg mb-4">
              {percentage >= 80 && "Outstanding! You're a geography expert! 🌟"}
              {percentage >= 60 && percentage < 80 && "Great job! You know your countries well! ✨"}
              {percentage >= 40 && percentage < 60 && "Good effort! Keep practicing! 💪"}
              {percentage < 40 && "Keep learning! Every expert was once a beginner! 🚀"}
            </div>

            {/* Answer breakdown */}
            <div className="flex flex-wrap gap-2 justify-center">
              {answers.map((correct, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    correct ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {correct ? '✓' : '✗'}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restartQuiz}
              className={`px-8 py-4 rounded-full bg-gradient-to-r ${gradientColors} text-white font-bold text-lg`}
            >
              Try Again
            </motion.button>

            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full glass text-white font-bold text-lg"
              >
                Back to Home
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg p-4">
      <div className="container mx-auto max-w-4xl py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-8"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass px-6 py-3 rounded-full text-white font-semibold"
            >
              ← Back
            </motion.button>
          </Link>

          <div className="glass px-6 py-3 rounded-full">
            <span className="text-white font-bold">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="glass rounded-full h-4 mb-8 overflow-hidden"
        >
          <motion.div
            className={`h-full bg-gradient-to-r ${gradientColors} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Quiz Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">{icon}</div>
          <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
          <div className="text-xl text-white/80">Score: {score}</div>
        </motion.div>

        {/* Question */}
        <AnimatePresence mode="wait">
          {!showFeedback && (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              {renderQuestion(questions[currentQuestion], handleAnswer)}
            </motion.div>
          )}

          {showFeedback && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="glass rounded-3xl p-12 text-center"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-8xl mb-4"
              >
                {lastAnswerCorrect ? '✅' : '❌'}
              </motion.div>
              <div className="text-3xl font-bold text-white">
                {lastAnswerCorrect ? 'Correct!' : 'Incorrect!'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
