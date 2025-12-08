'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getGameStats, ACHIEVEMENTS } from '@/lib/storage'

export default function StatsPanel() {
  const [stats, setStats] = useState(getGameStats())
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    setStats(getGameStats())
  }, [])

  if (stats.totalGames === 0) return null

  return (
    <>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowStats(!showStats)}
        className="glass px-6 py-3 rounded-full text-white font-semibold"
      >
        📊 Your Stats
      </motion.button>

      {showStats && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowStats(false)}
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="glass rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Your Statistics</h2>
              <button
                onClick={() => setShowStats(false)}
                className="text-white/60 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="glass p-4 rounded-2xl text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {stats.totalGames}
                </div>
                <div className="text-white/70 text-sm">Games Played</div>
              </div>
              <div className="glass p-4 rounded-2xl text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {stats.totalScore}
                </div>
                <div className="text-white/70 text-sm">Total Score</div>
              </div>
              <div className="glass p-4 rounded-2xl text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {stats.bestStreak}
                </div>
                <div className="text-white/70 text-sm">Best Streak</div>
              </div>
              <div className="glass p-4 rounded-2xl text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {stats.achievements.length}
                </div>
                <div className="text-white/70 text-sm">Achievements</div>
              </div>
            </div>

            {/* High Scores */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">High Scores</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass p-4 rounded-2xl">
                  <div className="text-2xl mb-2">🚩</div>
                  <div className="text-white/80 text-sm mb-1">Flags</div>
                  <div className="text-2xl font-bold text-white">
                    {stats.highScores.flags}/10
                  </div>
                </div>
                <div className="glass p-4 rounded-2xl">
                  <div className="text-2xl mb-2">🏛️</div>
                  <div className="text-white/80 text-sm mb-1">Capitals</div>
                  <div className="text-2xl font-bold text-white">
                    {stats.highScores.capitals}/10
                  </div>
                </div>
                <div className="glass p-4 rounded-2xl">
                  <div className="text-2xl mb-2">👥</div>
                  <div className="text-white/80 text-sm mb-1">Population</div>
                  <div className="text-2xl font-bold text-white">
                    {stats.highScores.population}/10
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            {stats.achievements.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Achievements ({stats.achievements.length}/{Object.keys(ACHIEVEMENTS).length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.values(ACHIEVEMENTS).map((achievement) => {
                    const unlocked = stats.achievements.includes(achievement.id)
                    return (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-2xl ${
                          unlocked ? 'glass' : 'bg-white/5'
                        }`}
                      >
                        <div className={`text-3xl mb-2 ${!unlocked && 'opacity-30'}`}>
                          {achievement.icon}
                        </div>
                        <div className={`font-bold mb-1 ${
                          unlocked ? 'text-white' : 'text-white/30'
                        }`}>
                          {achievement.name}
                        </div>
                        <div className={`text-xs ${
                          unlocked ? 'text-white/70' : 'text-white/20'
                        }`}>
                          {achievement.description}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
