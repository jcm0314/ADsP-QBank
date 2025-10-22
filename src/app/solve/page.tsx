'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Question } from '@/types/question'

export default function SolvePage() {
  const [question, setQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRandomQuestion()
  }, [])

  const fetchRandomQuestion = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/questions/random')
      if (res.ok) {
        const data = await res.json()
        setQuestion(data)
        setSelectedAnswer(null)
        setIsSubmitted(false)
      } else {
        setQuestion(null)
      }
    } catch (error) {
      console.error('Failed to fetch random question:', error)
      setQuestion(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      alert('답을 선택해주세요!')
      return
    }
    setIsSubmitted(true)
  }

  const handleNext = () => {
    fetchRandomQuestion()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">문제를 불러오는 중...</div>
      </div>
    )
  }

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl mb-4">문제를 불러올 수 없습니다.</p>
          <Link 
            href="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const isCorrect = selectedAnswer === question.answer

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6 flex justify-between items-center">
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-700"
          >
            ← 홈으로
          </Link>
          <button
            onClick={fetchRandomQuestion}
            className="text-gray-600 hover:text-gray-700 flex items-center gap-2"
          >
            🔄 다른 문제
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* 문제 헤더 */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                {question.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                question.difficulty === 1 ? 'bg-green-100 text-green-700' :
                question.difficulty === 2 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {question.difficulty === 1 ? '쉬움' : question.difficulty === 2 ? '보통' : '어려움'}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {question.title}
            </h1>
            <div className="text-gray-700 whitespace-pre-wrap">
              {question.content}
            </div>
          </div>

          {/* 선택지 */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrectAnswer = question.answer === index
              
              let bgColor = 'bg-white hover:bg-gray-50'
              let borderColor = 'border-gray-300'
              let textColor = 'text-gray-900'

              if (isSubmitted) {
                if (isCorrectAnswer) {
                  bgColor = 'bg-green-50'
                  borderColor = 'border-green-500'
                  textColor = 'text-green-900'
                } else if (isSelected && !isCorrect) {
                  bgColor = 'bg-red-50'
                  borderColor = 'border-red-500'
                  textColor = 'text-red-900'
                }
              } else if (isSelected) {
                bgColor = 'bg-blue-50'
                borderColor = 'border-blue-500'
              }

              return (
                <button
                  key={index}
                  onClick={() => !isSubmitted && setSelectedAnswer(index)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${bgColor} ${borderColor} ${textColor} ${
                    isSubmitted ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="font-semibold mr-3">
                      {index + 1}.
                    </span>
                    <span className="flex-1">{option}</span>
                    {isSubmitted && isCorrectAnswer && (
                      <span className="text-green-600 font-bold text-lg">✓ 정답</span>
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <span className="text-red-600 font-bold text-lg">✗</span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* 결과 표시 */}
          {isSubmitted && (
            <div className={`p-6 rounded-lg mb-6 ${
              isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">
                  {isCorrect ? '🎉' : '😢'}
                </span>
                <span className={`text-2xl font-bold ${
                  isCorrect ? 'text-green-700' : 'text-red-700'
                }`}>
                  {isCorrect ? '정답입니다!' : '틀렸습니다!'}
                </span>
              </div>
              {question.explanation && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span>📝</span>
                    <span>해설</span>
                  </h3>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {question.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 버튼 */}
          <div className="flex gap-3">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
              >
                정답 제출
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                다음 문제
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}