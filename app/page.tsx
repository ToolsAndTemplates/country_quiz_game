'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import StatsPanel from '@/components/StatsPanel'

export default function Home() {
  const [hoveredMode, setHoveredMode] = useState<string | null>(null)

  const quizModes = [
    {
      id: 'flags',
      title: 'Flag Master',
      description: 'Identify countries by their flags',
      icon: '🚩',
      color: 'from-blue-500 to-cyan-500',
      href: '/quiz/flags'
    },
    {
      id: 'capitals',
      title: 'Capital Cities',
      description: 'Match countries with their capitals',
      icon: '🏛️',
      color: 'from-purple-500 to-pink-500',
      href: '/quiz/capitals'
    },
    {
      id: 'population',
      title: 'Population Quiz',
      description: 'Guess which country has more people',
      icon: '👥',
      color: 'from-orange-500 to-red-500',
      href: '/quiz/population'
    }
  ]

  return (
    <main className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
            className="inline-block mb-6"
          >
            <div className="text-8xl mb-4 animate-float">🌍</div>
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Country Quiz Game
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8"
          >
            Test your geography knowledge with our exciting quiz modes!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 justify-center items-center text-white/80 mb-6"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span>Fast-paced</span>
            </div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <span>Educational</span>
            </div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <span>Challenging</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <StatsPanel />
          </motion.div>
        </motion.div>

        {/* Quiz Modes Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {quizModes.map((mode, index) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              onHoverStart={() => setHoveredMode(mode.id)}
              onHoverEnd={() => setHoveredMode(null)}
            >
              <Link href={mode.href}>
                <div className="relative group cursor-pointer h-full">
                  <div className={`glass rounded-3xl p-8 h-full transition-all duration-300 ${
                    hoveredMode === mode.id ? 'shadow-2xl shadow-white/20' : 'shadow-lg'
                  }`}>
                    <motion.div
                      animate={{
                        scale: hoveredMode === mode.id ? 1.1 : 1,
                        rotate: hoveredMode === mode.id ? [0, -10, 10, 0] : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-6xl mb-4"
                    >
                      {mode.icon}
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-3">
                      {mode.title}
                    </h3>

                    <p className="text-white/80 mb-6">
                      {mode.description}
                    </p>

                    <motion.div
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${mode.color} text-white font-semibold`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Quiz
                      <motion.span
                        animate={{ x: hoveredMode === mode.id ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-20 text-center"
        >
          <div className="glass rounded-3xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-white mb-2">195+</div>
                <div className="text-white/80">Countries</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">3</div>
                <div className="text-white/80">Quiz Modes</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">∞</div>
                <div className="text-white/80">Fun</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
